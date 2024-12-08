import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";

export interface b_6_5_CashHoldings {
    numbering: number | null; // "NN ը/կ"
    ownerName: string; // "Սեփականատիրոջ անունը, ազգանունը, հայրանունը"
    cashAmountAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա կանխիկ դրամի գումարը և արժույթը"
    sourceOfCash: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա կանխիկ դրամի ծագման աղբյուրը"
}

export const parseCashHoldings = (
    vc: ValueClass
): FillRowsResult<b_6_5_CashHoldings> => {
    const names = {
        numbering: ["NN ը/կ"],
        ownerName: ["Սեփականատիրոջ անունը, ազգանունը, հայրանունը"],
        cashAmountAndCurrency: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա կանխիկ դրամի գումարը և արժույթը"],
        sourceOfCash: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա կանխիկ դրամի ծագման աղբյուրը"]
    }

    return fillRows(names, vc);
};
