import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";


export interface b_6_3_ElectronicAccountCrypto {
    numbering: number | null; // "NN ը/կ"
    ownerName: string; // "Սեփականատիրոջ անունը, ազգանունը, հայրանունը"
    accountOrCryptoType: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա էլեկտրոնային հաշվի կամ կրիպտոարժույթի տեսակը"
    balanceAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա էլեկտրոնային հաշվի կամ կրիպտոարժույթի գումարը և արժույթը"
    sourceOfFunds: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա էլեկտրոնային հաշվի կամ կրիպտոարժույթի ծագման աղբյուրը"
}

export const parseElectronicAccountsAndCrypto = (
    vc: ValueClass
): FillRowsResult<b_6_3_ElectronicAccountCrypto> => {
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
