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
  rows: string[][]
): b_3_1_EquitySecuritiesAndInvestmentsRow[] => {
  return rows.map((row) => ({
    numbering: parseInt(row[0], 10) || null,
    ownerName: row[1] || "",
    companyName: row[2] || "",
    investmentType: row[3] || "",
    acquisitionDate: row[4] || "",
    acquisitionMethod: row[5] || "",
    counterpartyInfo: row[6] || "",
    relationshipNature: row[7] || "",
    currentValue: row[8] || "",
    ownershipPercentage: row[9] || "",
  }));
};
