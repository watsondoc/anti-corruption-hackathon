import fs from 'fs';
import csvParser from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import { getHaversineDistance, priceToAmd, getGeocode } from './marketApartmentUtils';

const wantedRecordCount = 2200;

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function readGetGeoWrite() {
  const inputFile = 'data/apartments_for_sale.csv';
  const outputFile = 'data/apartments_for_sale_w_geo.csv';

  const csvWriter = createObjectCsvWriter({
    path: outputFile,
    header: [
      { id: 'floor_area', title: 'floor_area' },
      { id: 'address', title: 'address' },
      { id: 'lat', title: 'lat' },
      { id: 'lon', title: 'lon' },
      { id: 'price', title: 'price' },
      { id: 'currency', title: 'currency' },
    ],
    append: true,
  });

  const processedData: any[] = [];
  let recordCount = 0;

  console.time('executionTime');
  const stream = fs.createReadStream(inputFile)
    .pipe(csvParser())
    .on('data', async (row) => {
      try {
        stream.pause();
        
        if (recordCount == wantedRecordCount) return;
  
        const { floor_area, address, price, currency } = row;
  
        if (
          !floor_area ||
          !address ||
          !price ||
          !currency ||
          isNaN(Number(price)) ||
          isNaN(Number(floor_area))
        ) {
          return;
        }
  
        const geo = await getGeocode(address);
        if (!geo) return;
        const [lat, lon] = geo;
        await sleep(800);
  
        processedData.push({
          floor_area,
          address,
          lat,
          lon,
          price: Number(price),
          currency,
        });
  
        recordCount++;
        if (recordCount % 5 === 0) {
          csvWriter.writeRecords(processedData.splice(0, 5)).catch((err: Error) => {
            console.error('Error while writing to CSV:', err);
          });
        }
      } finally {
        stream.resume();
      }
    })
    .on('end', () => {
      console.log(wantedRecordCount + ' apartments processed')
      console.timeEnd('executionTime');
    })
    .on('error', (err) => {
      console.error('Error reading CSV:', err);
    });
}

// readGetGeoWrite();
// header is added manually to apartments_for_sale_w_geo.csv later


function convertToAmdPerMeter() {
  const inputFile = 'data/apartments_for_sale_w_geo.csv';
  const outputFile = 'data/apartments_for_sale_w_geo_amd.csv';

  const csvWriter = createObjectCsvWriter({
    path: outputFile,
    header: [
      { id: 'lat', title: 'lat' },
      { id: 'lon', title: 'lon' },
      { id: 'price', title: 'amd_per_meter' },
    ],
  });

  const processedData: any[] = [];
  fs.createReadStream(inputFile)
    .pipe(csvParser())
    .on('data', (row) => {
      let { floor_area, price, currency, lat, lon } = row;

      price = priceToAmd(price, currency);

      price = price / floor_area;
      processedData.push({
        lat,
        lon,
        price,
      });
    })
    .on('end', () => {
      csvWriter.writeRecords(processedData).catch((err: Error) => {
        console.error('Error while writing to CSV:', err);
      });
      console.log(processedData.length + ' apartments processed')
    })
    .on('error', (err) => {
      console.error('Error reading CSV:', err);
    });
}

// convertToAmdPerMeter();


async function estimatePrice(originalLat: number, originalLon: number) {
  const inputFile = 'data/apartments_for_sale_w_geo_amd.csv';

  let closestPrice = 0;
  let closestDist = -1;
  fs.createReadStream(inputFile)
    .pipe(csvParser())
    .on('data', (row) => {
      const { lat, lon, amd_per_meter } = row;
      const currDist = getHaversineDistance(originalLat, originalLon, lat, lon)
      if (currDist < closestDist || closestDist === -1) {
        closestDist = currDist;
        closestPrice = amd_per_meter;
      }
    })
    .on('end', () => {
      // console.log('closestDist ' + closestDist)
      // console.log('closestPrice ' + closestPrice)
    })
    .on('error', (err) => {
      console.error('Error reading CSV:', err);
    });
}

// console.log(estimatePrice(40.20574310202286, 44.53131187614157));