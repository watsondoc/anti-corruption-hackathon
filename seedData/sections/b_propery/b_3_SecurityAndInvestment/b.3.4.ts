export interface b_3_4_DeclarantDebtSecuritiesThirdParty {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
    securityType: string; // "Արժեթղթի տեսակը"
    currentValue: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա պարտքային և այլ արժեթղթերի արժեքը(գինը) և արժույթը"
    ownerName: string; // "Պարտքային և այլ արժեթղթերի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
    relationshipNature: string; // "Հայտարարատուի և սեփականատիրոջ միջև առկա կապի բնույթը"
}

export const parseDeclarantDebtSecuritiesThirdParty = (
    rows: any[]
): b_3_4_DeclarantDebtSecuritiesThirdParty[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null,
        declarantName: row[1] || "",
        securityType: row[2] || "",
        currentValue: row[3] || "",
        ownerName: row[4] || "",
        relationshipNature: row[5] || "",
    }));
};
