import { Db, ObjectId } from 'mongodb';
import { client } from '../db/mongoClient';

export type WeightItem = {
  id: string;
  title: string;
  weight: number;
  description: string;
}

class WeightsService {
  private dbName: string;
  private collectionName: string;
  private db: Db;

  constructor(dbName: string, collectionName: string) {
    this.dbName = dbName;
    this.collectionName = collectionName;
    this.db = client.db(dbName);
  }

  async updateWeightItem(id: string, weight: number) {
    const collection = this.db.collection("weights");

    const filter = { id: id }; // Convert id string to ObjectId

    // Define the update operation
    const update = { $set: { weight: weight } };

    // Perform the update
    const result = await collection.updateOne(filter, update);

    return result;
  }

  async bulkUpdateWeights(weights: { id: string, weight: number }[]) {
    const collection = this.db.collection("weights");

    const bulkOps = weights.map(item => ({
      updateOne: {
        filter: { id: item.id },
        update: { $set: { weight: item.weight } }
      }
    }));

    const result = await collection.bulkWrite(bulkOps);
    return result;
  }

  async getAllWeightItems() {
    const collection = this.db.collection("weights");

    const data = await collection.find({}).toArray();

    return data;
  }

  async getWeightById(id: string) {
    const filter = { id: id };
    const collection = this.db.collection("weights");

    const items = await collection.find(filter).toArray()

    return items[0];
  }

  async resetWeightToDefault(id: string) {
    const collection = this.db.collection("weights");
    const filter = { id: id };
    const items = await collection.find(filter).toArray()


    // Define the update operation
    const update = { $set: { weight: items[0].defaultWeight } };

    // Perform the update
    const result = await collection.updateOne(filter, update);

    return result;
  }

  async generateWeights() {
    const weightsArray: WeightItem[] = [];
    try {
      const data = require('./weights.json');
    const collection = this.db.collection(this.collectionName);
      const result = await collection.insertMany(data);
      console.log(`Inserted ${result.insertedCount} documents into the weight collection`);
    } catch (err) {
      console.error("Failed to insert data", err);
    }
  }
}

export const weightsService = new WeightsService('corruption', 'weights');
