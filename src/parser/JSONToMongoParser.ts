import fs from 'fs';
import { client } from '../db/mongoClient';
const { chain } = require('stream-chain');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');

export class JSONToMongoParser {
  private dbName: string;
  private collectionName: string;

  constructor(dbName: string, collectionName: string) {
    this.dbName = dbName;
    this.collectionName = collectionName;
  }

  async parseAndInsert(jsonFilePath: string): Promise<void> {
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

        pipeline.on('data', async (data: { key: number; value: any }) => {
          const item = data.value; // Parsed JSON object
          try {
            // Insert the item into MongoDB
            await collection.insertOne(item);
            console.log(`Inserted item with ID: ${item.id}`);
          } catch (err) {
            console.error(`Failed to insert item with ID: ${item.id}`, err);
            reject(err);
          }
        });

        pipeline.on('end', () => {
          console.log('Finished processing file');
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
