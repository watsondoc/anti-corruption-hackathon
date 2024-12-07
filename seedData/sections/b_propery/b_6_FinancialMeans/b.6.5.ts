export interface b_6_5_CashHoldings {
    numbering: number | null; // "NN ը/կ"
    ownerName: string; // "Սեփականատիրոջ անունը, ազգանունը, հայրանունը"
    cashAmountAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա կանխիկ դրամի գումարը և արժույթը"
    sourceOfCash: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա կանխիկ դրամի ծագման աղբյուրը"
}

export const parseCashHoldings = (rows: string[][]): b_6_5_CashHoldings[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null, // "NN ը/կ"
        ownerName: row[1] || "", // "Սեփականատիրոջ անունը, ազգանունը, հայրանունը"
        cashAmountAndCurrency: row[2] || "", // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա կանխիկ դրամի գումարը և արժույթը"
        sourceOfCash: row[3] || "", // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա կանխիկ դրամի ծագման աղբյուրը"
    }));
};
