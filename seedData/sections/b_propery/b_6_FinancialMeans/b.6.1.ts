import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";


export interface b_6_1_BankAccountBalance {
    numbering: number | null; // "NN ը/կ"
    ownerName: string; // "Սեփականատիրոջ անունը, ազգանունը, հայրանունը"
    bankName: string; // "Բանկի անվանումը (ՀՀ տարածքից դուրս գտնվող բանկի դեպքում)"
    bankLocation: string; // "Բանկի գտնվելու վայրը (ՀՀ տարածքից դուրս գտնվող բանկի դեպքում)"
    balanceAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա դրամական միջոցի գումարը և արժույթը"
    sourceOfFunds: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա դրամական միջոցի ծագման աղբյուրը"
}

export const parseBankAccountBalances = (
    vc: ValueClass
): FillRowsResult<b_6_1_BankAccountBalance> => {
    const names = {
        numbering: ["NN ը/կ"],
        ownerName: ["Սեփականատիրոջ անունը, ազգանունը, հայրանունը"],
        bankName: ["Բանկի անվանումը (ՀՀ տարածքից դուրս գտնվող բանկի դեպքում)"],
        bankLocation: ["Բանկի գտնվելու վայրը (ՀՀ տարածքից դուրս գտնվող բանկի դեպքում)"],
        balanceAndCurrency: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա դրամական միջոցի գումարը և ա],րժույթը"],
        sourceOfFunds: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա դրամական միջոցի ծագման աղբյուրը"],
    }

    return fillRows(names, vc);
};
