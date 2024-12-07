export interface b_4_4_ThirdPartyBankDeposit {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
    bankName: string; // "Բանկի անվանումը (ՀՀ territory-ից դուրս գտնվող բանկի դեպքում)"
    bankLocation: string; // "Բանկի գտնվելու վայրը (ՀՀ territory-ից դուրս գտնվող բանկի դեպքում)"
    depositAmountAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ տվյալ բանկում առկա բանկային ավանդի գումարը և արժույթը"
    thirdPartyName: string; // "Երրորդ անձի անվանումը կամ անունը, ազգանունը, հայրանունը"
    relationshipWithThirdParty: string; // "Հայտարարատուի և երրորդ անձի միջև առկա կապի բնույթը"
}

export const parseThirdPartyBankDeposits = (
    rows: any[]
): b_4_4_ThirdPartyBankDeposit[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null,
        declarantName: row[1] || "",
        bankName: row[2] || "",
        bankLocation: row[3] || "",
        depositAmountAndCurrency: row[4] || "",
        thirdPartyName: row[5] || "",
        relationshipWithThirdParty: row[6] || "",
    }));
};
