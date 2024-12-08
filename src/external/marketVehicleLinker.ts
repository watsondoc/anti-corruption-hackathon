import fs from 'fs';
import csvParser from 'csv-parser';
import { client } from '../db/mongoClient';
import { distance, closest } from 'fastest-levenshtein';

export class MarketVehicleLinker {
  private dbName: string;
  private newCollectionName: string;

  constructor(dbName: string, newCollectionName: string) {
    this.dbName = dbName;
    this.newCollectionName = newCollectionName;
  }

  async getVehiclePrice(name: string, year: number): Promise<number | undefined> {
    const db = client.db(this.dbName);
    const collection = db.collection(this.newCollectionName);
    const yearRadius = 6;
    const maxNameDistance = 4;

    const similarCars = await collection.find({
      $text: {$search: name}, 
      year: {$gte: year - yearRadius, $lt: year + yearRadius}
    }).toArray();

    if (similarCars.length) {
      const bestDist = distance(name, closest(name, similarCars.flatMap(item => item.name.toLowerCase())))
      if (bestDist <= maxNameDistance) {
        const bestPrices = similarCars.filter(item => distance(name, item.name.toLowerCase()) <= bestDist).flatMap(item => item.price);
        return bestPrices.reduce((a, b) => a + b) / bestPrices.length;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  async parseAndInsert(dataFilePath: string): Promise<void> {
    try {
      const db = client.db(this.dbName);
      const collection = db.collection(this.newCollectionName);

      return new Promise((resolve, reject) => {
        fs.createReadStream(dataFilePath)
          .pipe(csvParser())
          .on('data', async (data) => {
            try {
              await collection.insertOne({
                name: data["Car Name"],
                year: Number(data.Year),
                price: Number(data.Price),
              });
            } catch (err) {
              console.error(`Failed to insert item with name: ${data["Car Name"]}`, err);
              reject(err);
            }
          })
          .on('end', () => {
            console.log('Market vehicle prices added.');
            resolve()
          })
          .on('error', (error) => reject(error));
      })
    } catch (err) {
      console.error('Error:', err);
    } finally {
    }
  }

  async createCollection(): Promise<void> {
    const db = client.db(this.dbName);    
    db.createCollection(this.newCollectionName);
    const collection = db.collection(this.newCollectionName);
    collection.createIndex({name: 'text'});
  }

  async dropCollection(): Promise<void> {
    const db = client.db(this.dbName);
    db.collection(this.newCollectionName).drop();
  }
}
