export interface b_3_3_DeclarantDebtSecurities {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատու սեփականատիրոջ անունը, ազգանունը, հայրանունը"
    securityType: string; // "Արժեթղթի տեսակը"
    acquisitionDate: string; // "Ձեռքբերման ամսաթիվը"
    acquisitionMethod: string; // "Ձեռք բերելու եղանակը"
    counterpartyInfo: string; // "Գործարքի մյուս կողմի անվանումը կամ անունը, ազգանունը, հայրանունը, հասցեն"
    relationshipNature: string; // "Կողմերի միջև առկա կապի բնույթը"
    currentValue: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա պարտքային և այլ արժեթղթերի արժեքը(գինը) և արժույթը"
}

export const parseDeclarantDebtSecurities = (
    rows: any[]
): b_3_3_DeclarantDebtSecurities[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null,
        declarantName: row[1] || "",
        securityType: row[2] || "",
        acquisitionDate: row[3] || "",
        acquisitionMethod: row[4] || "",
        counterpartyInfo: row[5] || "",
        relationshipNature: row[6] || "",
        currentValue: row[7] || "",
    }));
};
