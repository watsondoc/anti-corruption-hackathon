import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import multer from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('excel')
  @UseInterceptors(FileInterceptor('file', {
      storage: multer.memoryStorage(),
    })
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('File upload is required');
    }

    if (file.mimetype === 'text/csv') {
      await this.uploadService.parseCSV(file);
    } else {
      throw new Error('Unsupported file type');
    }
  }
}
