export interface b_6_6_CashHoldingsThirdParty {
    numbering: number | null; // "NN ը/կ"
    ownerName: string; // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
    cashAmountAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա կանխիկ դրամի գումարը և արժույթը"
    sourceOfCash: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա կանխիկ դրամի ծագման աղբյուրը"
    thirdPartyOwnerName: string; // "Կանխիկ դրամի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
    relationshipNature: string; // "Հայտարարատուի և երրորդ անձի միջև առկա կապի բնույթը"
}

export const parseCashHoldingsThirdParty = (rows: string[][]): b_6_6_CashHoldingsThirdParty[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null, // "NN ը/կ"
        ownerName: row[1] || "", // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
        cashAmountAndCurrency: row[2] || "", // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա կանխիկ դրամի գումարը և արժույթը"
        sourceOfCash: row[3] || "", // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա կանխիկ դրամի ծագման աղբյուրը"
        thirdPartyOwnerName: row[4] || "", // "Կանխիկ դրամի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
        relationshipNature: row[5] || "", // "Հայտարարատուի և երրորդ անձի միջև առկա կապի բնույթը"
    }));
};