import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MongodbEntity extends Document {
  @Prop()
  key: string;

  @Prop()
  description: string;
}

export const MongodbSchema = SchemaFactory.createForClass(MongodbEntity);
