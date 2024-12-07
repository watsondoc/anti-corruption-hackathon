export interface b_4_2_DeclarantThirdPartyLoan {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
    loanInterestRate: string; // "Փոխառության տոկոսադրույքը"
    loanAmountAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա փոխառության գումարը և արժույթը"
    thirdPartyName: string; // "Երրորդ անձի անվանումը կամ անունը, ազգանունը, հայրանունը"
    relationshipNatureWithThirdParty: string; // "Հայտարարատուի և երրորդ անձի միջև առկա կապի բնույթը"
}

export const parseDeclarantThirdPartyLoan = (
    rows: any[]
): b_4_2_DeclarantThirdPartyLoan[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null,
        declarantName: row[1] || "",
        loanInterestRate: row[2] || "",
        loanAmountAndCurrency: row[3] || "",
        thirdPartyName: row[4] || "",
        relationshipNatureWithThirdParty: row[5] || "",
    }));
};
