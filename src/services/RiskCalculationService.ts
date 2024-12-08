import { client } from '../db/mongoClient';
import { Db, ObjectId } from 'mongodb';
import { Declaration } from '../../interfaces/Declaration';
import { Declarant } from '../../interfaces/Declarant';

const currencyExchange: any = {
  '$': 400,
  '€': 425,
}

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

    const items: Declaration[] = await collection.find<Declaration>(filter).toArray();

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

      if (item.risk) {
        item.risk = {
          ...item.risk,
          QPDRI: {
            QPDRI: QPDRI,
            QPDRI_D: QPDRI_D,
            q: q,
            VEavg: VEavg,
          }
        }
      } else {
        item.risk = {
          QPDRI: {
            QPDRI: QPDRI,
            QPDRI_D: QPDRI_D,
            q: q,
            VEavg: VEavg,
          }
        }
      }

      await collection.updateOne(
        { id: item.id }, // Filter by _id
        { $set: item } // Update the document
      );

      console.log('updated' + item.id + ' with risks:' + JSON.stringify(item.risk));
    }

    return q;
  }

  public async calculateByYearAbrTRI(year: number) {
    const collection = this.db.collection(this.collectionName);

    const filter = { year: year };

    const items: Declaration[] = await collection.find<Declaration>(filter).toArray();

    let AbrTRI = 0;
    for (const item of items) {
      const incomeArray = item.c_incomes.c_1_revenues.c_1_1_reportingPeriodIncomes;

      for (const income of incomeArray) {
        const address = (income.payerAddress || "").toLowerCase();

        if (!address.includes('Հայաս'.toLowerCase()) && address != 'Պաշտպանված'.toLowerCase()) {
          AbrTRI = 1;
        }
      }

      if (item.risk) {
        item.risk = {
          ...item.risk,
          AbrTRI: {
            AbrTRI: AbrTRI
          }
        }
      } else {
        item.risk = {
          AbrTRI: {
            AbrTRI: AbrTRI,
          }
        }
      }

      await collection.updateOne(
        { id: item.id }, // Filter by _id
        { $set: item } // Update the document
      );
    }
  }

  public async calculateByYearTotalIncome(year: number) {
    const collection = this.db.collection(this.collectionName);

    const filter = { year: year };

    const items: Declaration[] = await collection.find<Declaration>(filter).toArray();

    for (const item of items) {
      const incomeAgg: any = {};
      const incomeArray = item.c_incomes.c_1_revenues.c_1_1_reportingPeriodIncomes;

      for (const income of incomeArray) {
        const money = income.monetaryIncomeAmountAndCurrency;
        const type = income.incomeType;

        if (money === '' || type === '') {
          continue;
        }

        let moneyIncome: any = [];
        try {
          moneyIncome = this.parseMonetaryField(money);
        } catch(ex: any) {
          continue;
        }


        let amountMoney = moneyIncome[1];
        if (currencyExchange[moneyIncome[0]]) {
          amountMoney = amountMoney * currencyExchange[moneyIncome[0]];
        }
        incomeAgg[type] = (incomeAgg[type] || 0) + amountMoney;

        // console.log(incomeAgg);
      }

      item.incomeAgg = {
        ...incomeAgg,
      }

      await collection.updateOne(
        { id: item.id }, // Filter by _id
        { $set: item } // Update the document
      );
    }
  }

  private parseMonetaryField(money: string) {
    const moneyArr = money.split(" ");
    const parsedNumber = parseInt(moneyArr[1].replace(/,/g, ""), 10)
    return [moneyArr[0], parsedNumber];
  }

  public async calculateByYearGiftRI(year: number) {
    const collection = this.db.collection(this.collectionName);

    const filter = { year: year };

    const items: Declaration[] = await collection.find<Declaration>(filter).toArray();

    let GiftRI = 0;
    for (const item of items) {
      const incomeAgg = item.incomeAgg;

      if (incomeAgg) {
        // A gift.
        const gifts = incomeAgg['Նվիրատվության կամ օգնության կարգով ստացված գույքը, դրամական միջոցները (բացառությամբ աշխատանքի, ծառայության տեսքով ստացած)'];
        const incomes: number[] = Object.values(incomeAgg);
        const total = incomes.reduce((a: number, b: number) => a + b, 0)
        if (gifts >= total * 0.3) {
          GiftRI = 2;
        }
      }

      if (item.risk) {
        item.risk = {
          ...item.risk,
          GiftRI: {
            GiftRI: GiftRI
          }
        }
      } else {
        item.risk = {
          GiftRI: {
            GiftRI: GiftRI,
          }
        }
      }

      await collection.updateOne(
        { id: item.id },
        { $set: item }
      );
    }
  }

  // public async calculateLuckyRI() {
  //   const collection = this.db.collection("declarants");
  
  //   const persons: Declarant[] = await collection.find<Declarant>({}).toArray();
  
  //   Look to the MongoDB lookup syntax to join collections.
  //   let LuckyRI = 0;
  //   for (const person of persons) {
  //     person.
  //   }
  // }
}

export const riskCalculationService = new RiskCalculationService();
