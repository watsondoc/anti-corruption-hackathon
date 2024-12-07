export interface b_4_1_DeclarantLoan {
    numbering: number | null; // "NN ը/կ"
    declarantLenderName: string; // "Հայտարարատու պարտատիրոջ անունը, ազգանունը, հայրանունը"
    borrowerName: string; // "Պարտապանի անվանումը կամ անունը, ազգանունը, հայրանունը"
    borrowerAddress: string; // "Պարտապանի հասցեն"
    relationshipNature: string; // "Կողմերի միջև առկա կապի բնույթը"
    loanInterestRate: string; // "Փոխառության տոկոսադրույքը"
    loanAmountAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա փոխառության գումարը և արժույթը"
}

export const parseDeclarantLoan = (
    rows: any[]
): b_4_1_DeclarantLoan[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null,
        declarantLenderName: row[1] || "",
        borrowerName: row[2] || "",
        borrowerAddress: row[3] || "",
        relationshipNature: row[4] || "",
        loanInterestRate: row[5] || "",
        loanAmountAndCurrency: row[6] || "",
    }));
};
