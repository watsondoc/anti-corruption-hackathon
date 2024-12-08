export interface b_3_2_DeclarantThirdPartyInvestments {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
    companyName: string; // "Ընկերության լրիվ անվանումը"
    investmentType: string; // "Արժեթղթի կամ այլ ներդրման տեսակը"
    currentValue: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա բաժնային արժեթղթի կամ այլ ներդրման արժեքը(գինը) և արժույթը"
    ownershipPercentage: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա բաժնային արժեթղթի կամ այլ ներդրման բաժնեմասնակցության %"
    ownerInfo: string; // "Բաժնային արժեթղթերի և այլ ներդրումների սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
    relationshipNature: string; // "Հայտարարատուի և սեփականատիրոջ միջև առկա կապի բնույթը"
}

export const parseDeclarantThirdPartyInvestments = (
    rows: string[][]
): b_3_2_DeclarantThirdPartyInvestments[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null,
        declarantName: row[1] || "",
        companyName: row[2] || "",
        investmentType: row[3] || "",
        currentValue: row[4] || "",
        ownershipPercentage: row[5] || "",
        ownerInfo: row[6] || "",
        relationshipNature: row[7] || "",
    }));
};
