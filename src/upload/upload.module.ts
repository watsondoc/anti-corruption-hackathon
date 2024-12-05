import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MongoDbModule } from '../database/mongodb/mongodb.module';

@Module({
  imports: [MongoDbModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
