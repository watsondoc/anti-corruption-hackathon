export interface b_6_1_BankAccountBalance {
    numbering: number | null; // "NN ը/կ"
    ownerName: string; // "Սեփականատիրոջ անունը, ազգանունը, հայրանունը"
    bankName: string; // "Բանկի անվանումը (ՀՀ տարածքից դուրս գտնվող բանկի դեպքում)"
    bankLocation: string; // "Բանկի գտնվելու վայրը (ՀՀ տարածքից դուրս գտնվող բանկի դեպքում)"
    balanceAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա դրամական միջոցի գումարը և արժույթը"
    sourceOfFunds: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա դրամական միջոցի ծագման աղբյուրը"
}

export const parseBankAccountBalances = (
    rows: string[][]
): b_6_1_BankAccountBalance[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null, // "NN ը/կ"
        ownerName: row[1] || "", // "Սեփականատիրոջ անունը, ազգանունը, հայրանունը"
        bankName: row[2] || "", // "Բանկի անվանումը (ՀՀ տարածքից դուրս գտնվող բանկի դեպքում)"
        bankLocation: row[3] || "", // "Բանկի գտնվելու վայրը (ՀՀ տարածքից դուրս գտնվող բանկի դեպքում)"
        balanceAndCurrency: row[4] || "", // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա դրամական միջոցի գումարը և արժույթը"
        sourceOfFunds: row[5] || "", // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա դրամական միջոցի ծագման աղբյուրը"
    }));
};
