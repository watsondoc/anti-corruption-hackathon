import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { MongodbEntity } from '../database/mongodb/mongodb.schema';
import csv = require('csv-parser');
import * as stream from 'stream';
import { MongoDbService } from '../database/mongodb/mongodb.service';

@Injectable()
export class UploadService {
  constructor(
    private readonly mongoDbService: MongoDbService,  // Inject MongoDbService here
  ) {}

  async parseCSV(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);

      bufferStream
        .pipe(csv())
        .on('data', async (data) => {
          results.push(data);

          await this.mongoDbService.create({
            key: data.key, // Map the key from the CSV
            description: data.description, // Map the description from the CSV
          });
        })
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

  async parseExcel(file: Express.Multer.File): Promise<any> {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Example: Extract specific columns
    const parsedData = data.map((row: any) => ({
      columnA: row['Column A'], // Replace with your column names
      columnB: row['Column B'],
    }));

    return parsedData;
  }
}
