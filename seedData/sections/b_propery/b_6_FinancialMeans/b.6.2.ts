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

import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";

export const parseThirdPartyBankAccountBalances = (
    vc: ValueClass
): FillRowsResult<b_6_2_ThirdPartyBankAccountBalance> => {
    const names = {
        numbering: ["NN ը/կ"],
        declarantName: ["Հայտարարատուի անունը, ազգանունը, հայրանունը"],
        bankName: ["Բանկի անվանումը (ՀՀ տարածքից դուրս գտնվող բանկի դեպքում)"],
        bankLocation: ["Բանկի գտնվելու վայրը (ՀՀ տարածքից դուրս գտնվող բանկի դեպքում)"],
        balanceAndCurrency: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա դրամական միջոցի գումարը և արժույթը"],
        sourceOfFunds: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա դրամական միջոցի ծագման աղբյուրը"],
        accountOwnerName: ["Բանկային հաշիվների մնացորդների սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"],
        relationshipNature: ["Հայտարարատուի և երրորդ անձի միջև առկա կապի բնույթը"],
    }

    return fillRows(names, vc);
};