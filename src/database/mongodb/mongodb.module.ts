import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDbService } from './mongodb.service';
import { MongodbEntity, MongodbSchema } from './mongodb.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MongodbEntity.name, schema: MongodbSchema }])
  ],
  providers: [MongoDbService],
  exports: [MongoDbService],
})
export class MongoDbModule {}
