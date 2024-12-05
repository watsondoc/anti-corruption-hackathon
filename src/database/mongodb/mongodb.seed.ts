import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongodbEntity } from './mongodb.schema';

@Injectable()
export class MongodbSeed {
  constructor(
    @InjectModel(MongodbEntity.name)
    private readonly model: Model<MongodbEntity>,
  ) {}

  async seed() {
    const data = [
      { key: 'Key1', description: 'Description1' },
      { key: 'Key2', description: 'Description2' },
    ];
    await this.model.insertMany(data);
  }
}
