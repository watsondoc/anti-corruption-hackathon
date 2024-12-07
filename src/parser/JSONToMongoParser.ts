import fs from 'fs';
import { client } from '../db/mongoClient';
import { Declaration } from '../../interfaces/Declaration';
import * as path from 'path';
import { parseDetails } from './parseDetails';
import { chain } from 'stream-chain'
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');

export class JSONToMongoParser {
  private dbName: string;
  private collectionName: string;

  constructor(dbName: string, collectionName: string) {
    this.dbName = dbName;
    this.collectionName = collectionName;
  }

  async loadDeclarations(generalPath: string, detailsPath: string) {
    const generalToIdMap = await this.loadGeneralToMap(generalPath);
    await this.loadDetailsInsert(detailsPath, generalToIdMap);
  }

  private readFileAsync(filePath: string, encoding = 'utf-8') {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (err: any, data: any) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  async loadGeneralToMap(filePath: string) {

    try {
      // Read the JSON file
      const data: any = await this.readFileAsync(filePath);
      const jsonArray = JSON.parse(data);

      // Create a map with 'id' as the key and other properties as the value
      const map = new Map();
      for (const item of jsonArray) {
        if (item.id) {
          const { id, ...otherProps } = item;
          map.set(id, otherProps);
        }
      }

      return map;
    } catch (error) {
      console.error('Error loading JSON file:', error);
      throw error;
    }
  }

  async loadDetailsInsert(jsonFilePath: string, generalMap: any): Promise<void> {

    const declarations: any[] = [];

    try {
      console.log('Connected to MongoDB');

      const db = client.db(this.dbName);
      const collection = db.collection(this.collectionName);

      return new Promise((resolve, reject) => {
        const pipeline = chain([
          fs.createReadStream(jsonFilePath),
          parser(),
          streamArray()
        ]);

        let count = 0;

        pipeline.on('data', async (data: { key: number; value: any }) => {
          const item = data.value; // Parsed JSON object
          const declarant = generalMap.get(item.id);

          const details = parseDetails(item);

          const declaration: Declaration = {
            id: item.id,
            name: declarant.name,
            declarant: declarant.declarant,
            declarantType: declarant.declarantType,
            institutionGroup: declarant.institutionGroup,
            institution: declarant.institution,
            position: declarant.position,
            submissionDate: declarant.submissionDate,
            type: declarant.type,
            year: declarant.year,
            a_generals: details.generals,
            b_properties: details.properties,
            c_incomes: details.incomes,
            d_interests: details.interests,
            e_expenses: details.expenses
          }

          // fs.writeFileSync(path.join(__dirname, `${count++}.json`), JSON.stringify(declaration, null, 2));

          if (count > 1000) {
            pipeline.end();
            return;
          }

          try {
            // Insert the item into MongoDB
            declarations.push(declaration);
            // await collection.insertOne(declaration);
            console.log(`Inserted item with ID: ${item.id}`);
          } catch (err) {
            console.error(`Failed to insert item with ID: ${item.id}`, err);
            reject(err);
          }
        });

        pipeline.on('end', async () => {
          console.log('Finished processing file');
          await collection.drop();
          await collection.insertMany(declarations);

          client.close();
          resolve();
        });

        pipeline.on('error', (err: any) => {
          console.error('Error processing file:', err);
          client.close();
          reject(err);
        });
      });

      console.log('Data insertion completed.');
    } catch (err) {
      console.error('Error:', err);
    } finally {
      console.log('MongoDB operations completed.');
    }
  }
}
