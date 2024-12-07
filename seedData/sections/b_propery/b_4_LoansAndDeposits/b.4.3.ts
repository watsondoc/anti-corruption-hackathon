export interface b_4_3_BankDeposit {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատու պարտատիրոջ անունը, ազգանունը, հայրանունը"
    bankName: string; // "Բանկի անվանումը (ՀՀ territory-ից դուրս գտնվող բանկի դեպքում)"
    bankLocation: string; // "Բանկի գտնվելու վայրը (ՀՀ territory-ից դուրս գտնվող բանկի դեպքում)"
    depositAmountAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ տվյալ բանկում առկա ավանդի գումարը և արժույթը"
}

export const parseBankDeposits = (
    rows: any[]
): b_4_3_BankDeposit[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null,
        declarantName: row[1] || "",
        bankName: row[2] || "",
        bankLocation: row[3] || "",
        depositAmountAndCurrency: row[4] || "",
    }));
};
