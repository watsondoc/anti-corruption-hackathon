import { client } from '../db/mongoClient';
import { Db, ObjectId } from 'mongodb';
import { Declaration } from '../../interfaces/Declaration';

class RiskCalculationService {
  private dbName: string = "corruption";
  private collectionName: string = "declarations";
  private db: Db;

  constructor() {
    this.db = client.db(this.dbName);
  }

  public async calculateIndicatorsPerYear(year: number) {
    await this.calculateByYearQPDRI(year);
  }

  public async calculateByYearQPDRI(year: number) {
    const collection = this.db.collection(this.collectionName);

    const filter = { year: year };

    const items: Declaration[] = await collection.find<Declaration>(filter).limit(1000).toArray();

    let VEall = 0;

    const itemsLenght = items.length;

    for (const item of items) {
      const transportLen = item.b_properties.b_2_vehicle.b_2_1_transports.length;
      const estateLen = item.b_properties.b_1_realEstate.b_1_1_realEstates.length;
      VEall += (transportLen + estateLen);
    }

    const VEavg = VEall / itemsLenght;

    let VE = 0;
    let sqrDiff = 0;
    for (const item of items) {
      const transportLen = item.b_properties.b_2_vehicle.b_2_1_transports.length;
      const estateLen = item.b_properties.b_1_realEstate.b_1_1_realEstates.length;

      VE = transportLen + estateLen;

     sqrDiff += Math.pow(VEavg - VE, 2);
    }

    const q = Math.sqrt(sqrDiff / (itemsLenght - 1));

    let QPDRI = 0;
    let QPDRI_D = 0;

    for (const item of items) {
      const transportLen = item.b_properties.b_2_vehicle.b_2_1_transports.length;
      const estateLen = item.b_properties.b_1_realEstate.b_1_1_realEstates.length;

      const VE = transportLen + estateLen;

      if (VE > (q + VEavg)) {
        QPDRI = 1;
      } else {
        QPDRI = 0;
      }

      const x = (VE - VEavg) / q;
      if (x < 0) {
        QPDRI_D = 0;
      } else {
        QPDRI_D = 2 * ( 1 -  1 / (1 + Math.exp(10 * (x - 1) ) ) );
      }

      item.risk = {
        QPDRI: {
          QPDRI: QPDRI,
          QPDRI_D: QPDRI_D,
          q: q,
          VEavg: VEavg,
        }
      }

      await collection.updateOne(
        { id: item.id }, // Filter by _id
        { $set: item } // Update the document
      );
    }

    return q;
  }

/*  public async calculateByYearTotalIncome(year: number) {
    const collection = this.db.collection(this.collectionName);

    const filter = { year: year };

    const items: Declaration[] = await collection.find<Declaration>(filter).limit(1000).toArray();

    for (const item of items) {
      const incomeArray = item.c_incomes.c_1_revenues.c_1_1_reportingPeriodIncomes;

      for (const income of incomeArray) {
        if ()
      }
    }
  }*/
}

export const riskCalculationService = new RiskCalculationService();
