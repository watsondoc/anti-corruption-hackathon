import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";

export interface b_6_6_CashHoldingsThirdParty {
    numbering: number | null; // "NN ը/կ"
    ownerName: string; // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
    cashAmountAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա կանխիկ դրամի գումարը և արժույթը"
    sourceOfCash: string; // "Պաշտոնի ստանձնման կամ դ��դարեցման օրվա դրությամբ առկա կանխիկ դրամի ծագման աղբյուրը"
    thirdPartyOwnerName: string; // "Կանխիկ դրամի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
    relationshipNature: string; // "Հայտարարատուի և երրորդ անձի միջև առկա կապի բնույթը"
}

export const parseCashHoldingsThirdParty = (
    vc: ValueClass
): FillRowsResult<b_6_6_CashHoldingsThirdParty> => {
    const names = {
        numbering: ["NN ը/կ"],
        ownerName: ["Հայտարարատուի անունը, ազգանունը, հայրանունը"],
        cashAmountAndCurrency: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա կանխիկ դրամի գումարը և արժույթը"],
        sourceOfCash: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա կանխիկ դրամի ծագման աղբյուրը"],
        thirdPartyOwnerName: ["Կանխիկ դրամի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"],
        relationshipNature: ["Հայտարարատուի և երրորդ անձի միջև առկա կապի բնույթը"]
    }

    return fillRows(names, vc);
};