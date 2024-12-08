import fs from 'fs';
import csvParser from 'csv-parser';
import { client } from '../db/mongoClient';
import { throttle } from 'lodash';
import { getGeocode, getHaversineDistance } from './marketApartmentUtils';

const throttledGetGeocode = throttle(getGeocode, 800);

export class MarketApartmentLinker {
  private dbName: string;
  private newCollectionName: string;
  
  private storedLatLonMap = new Map<string, [lat: number, lon: number] | undefined>();

  constructor(dbName: string, newCollectionName: string) {
    this.dbName = dbName;
    this.newCollectionName = newCollectionName;
  }

  trimLocationAddress = (address: string) => {
    // Most have such a type: Republic of Armenia, Region, City, Restricted.
    return address.split(' ').slice(0, 4).filter(word => word !== 'Պաշտպանված' && word.length >= 4).join(' ');
  }

  async getLatLon(locationAddress: string): Promise<[lat: number, lon: number] | undefined> {
    if (this.storedLatLonMap.has(locationAddress)) {
      return this.storedLatLonMap.get(locationAddress);
    }
    const geo = await throttledGetGeocode(locationAddress);
    this.storedLatLonMap.set(locationAddress, geo);
    return geo;
  }

  async createCollection(): Promise<void> {
    const db = client.db(this.dbName);    
    db.createCollection(this.newCollectionName);
  }

  async dropCollection(): Promise<void> {
    const db = client.db(this.dbName);
    db.collection(this.newCollectionName).drop();
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
                lat: data.lat,
                lon: data.lon,
                price: data.amd_per_meter,
              });
            } catch (err) {
              console.error(`Failed to insert item: ${data.lat}, ${data.lon}`, err);
              reject(err);
            }
          })
          .on('end', () => {
            console.log('Market apartments prices added.');
            resolve()
          })
          .on('error', (error) => reject(error));
      })
    } catch (err) {
      console.error('Error:', err);
    } finally {
    }
  }

  async get(): Promise<any[]> {
    const db = client.db(this.dbName);    
    const collection = db.collection(this.newCollectionName);
    return collection.find().limit(3).toArray();
  }

  async getApartmentPrice(address: string): Promise<number | undefined> {
    const db = client.db(this.dbName);
    const collection = db.collection(this.newCollectionName);

    const geo = await this.getLatLon(this.trimLocationAddress(address));
    if (!geo) return undefined;
    const [lat, lon] = geo;

    let smallestDist = -1;
    let bestPrice = -1;
    await collection.find().forEach(item => {
      const currDist = getHaversineDistance(lat, lon, item.lat, item.lon)
      if (currDist < smallestDist || smallestDist == -1) {
        smallestDist = currDist;
        bestPrice = item.price;
      }
    });
    return bestPrice;
  }

  async getAll(): Promise<any[]> {
    const db = client.db(this.dbName);
    const collection = db.collection(this.newCollectionName);

    return collection.find().toArray();
  }
}
