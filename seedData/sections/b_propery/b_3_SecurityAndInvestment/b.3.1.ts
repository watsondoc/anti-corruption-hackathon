import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";

export interface b_3_1_EquitySecuritiesAndInvestmentsRow {
  numbering: number | null; // "NN ը/կ"
  ownerName: string; // "Հայտարարատու սեփականատիրոջ անունը, ազգանունը, հայրանունը"
  companyName: string; // "Ընկերության լրիվ անվանումը"
  investmentType: string; // "Արժեթղթի կամ այլ ներդրման տեսակը"
  acquisitionDate: string; // "Ձեռք բերելու ամսաթիվը"
  acquisitionMethod: string; // "Ձեռք բերելու եղանակը"
  counterpartyInfo: string; // "Գործարքի մյուս կողմի անվանումը կամ անունը, ազգանունը, հայրանունը, հասցեն"
  relationshipNature: string; // "Կողմերի միջև առկա կապի բնույթը"
  currentValue: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա բաժնային արժեթղթի կամ այլ ներդրման արժեքը(գինը) և արժույթը"
  ownershipPercentage: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա բաժնային արժեթղթի կամ այլ ներդրման բաժնեմասնակցության %"
}

export const parseEquitySecuritiesAndInvestmentsRows = (
  vc: ValueClass
): FillRowsResult<b_3_1_EquitySecuritiesAndInvestmentsRow> => {

  const names = {
    numbering: ["NN ը/կ"],
    ownerName: ["Հայտարարատու սեփականատիրոջ անունը, ազգանունը, հայրանունը"],
    companyName: ["Ընկերության լրիվ անվանումը"],
    investmentType: ["Արժեթղթի կամ այլ ներդրման տեսակը"],
    acquisitionDate: ["Ձեռք բերելու ամսաթիվը"],
    acquisitionMethod: ["Ձեռք բերելու եղանակը"],
    counterpartyInfo: ["Գործարքի մյուս կողմի անվանումը կամ անունը, ազգանունը, հայրանունը, հասցեն"],
    relationshipNature: ["Կողմերի միջև առկա կապի բնույթը"],
    currentValue: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա բաժնային արժեթղթի կամ այլ ներդրման արժեքը(գինը) և արժույթը"],
    ownershipPercentage: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա բաժնային արժեթղթի կամ այլ ներդրման բաժնեմասնակցության %"]
  }

  return fillRows(names, vc);
};
