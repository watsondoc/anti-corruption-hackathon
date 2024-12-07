export interface b_6_2_ThirdPartyBankAccountBalance {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
    bankName: string; // "Բանկի անվանումը (ՀՀ տարածքից դուրս գտնվող բանկի դեպքում)"
    bankLocation: string; // "Բանկի գտնվելու վայրը (ՀՀ տարածքից դուրս գտնվող բանկի դեպքում)"
    balanceAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա դրամական միջոցի գումարը և արժույթը"
    sourceOfFunds: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա դրամական միջոցի ծագման աղբյուրը"
    accountOwnerName: string; // "Բանկային հաշիվների մնացորդների սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
    relationshipNature: string; // "Հայտարարատուի և երրորդ անձի միջև առկա կապի բնույթը"
}

export const parseThirdPartyBankAccountBalances = (
    rows: string[][]
): b_6_2_ThirdPartyBankAccountBalance[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null, // "NN ը/կ"
        declarantName: row[1] || "", // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
        bankName: row[2] || "", // "Բանկի անվանումը (ՀՀ տարածքից դուրս գտնվող բանկի դեպքում)"
        bankLocation: row[3] || "", // "Բանկի գտնվելու վայրը (ՀՀ տարածքից դուրս գտնվող բանկի դեպքում)"
        balanceAndCurrency: row[4] || "", // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա դրամական միջոցի գումարը և արժույթը"
        sourceOfFunds: row[5] || "", // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա դրամական միջոցի ծագման աղբյուրը"
        accountOwnerName: row[6] || "", // "Բանկային հաշիվների մնացորդների սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
        relationshipNature: row[7] || "", // "Հայտարարատուի և երրորդ անձի միջև առկա կապի բնույթը"
    }));
};