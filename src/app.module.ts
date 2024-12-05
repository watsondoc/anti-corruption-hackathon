import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { PostgresqlModule } from './database/postgresql/postgresql.module';
import { MongoDbModule } from './database/mongodb/mongodb.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UploadModule,
    PostgresqlModule,
    MongooseModule.forRoot('mongodb://root:password@localhost:27017/corruption?authSource=admin'),
    MongoDbModule,
  ],
})
export class AppModule {}
