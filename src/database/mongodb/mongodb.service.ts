import { Injectable } from '@nestjs/common';
import { MongodbEntity } from './mongodb.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MongoDbService {
  constructor(
    @InjectModel(MongodbEntity.name) private readonly mongodbModel: Model<MongodbEntity>,  // Inject the model here
  ) {}
  async create(data: { key: string; description: string }) {
    const createdEntity = new this.mongodbModel(data);
    return await createdEntity.save();
  }

  // Example method to find all data in the collection
  async findAll() {
    return this.mongodbModel.find().exec();
  }
}
