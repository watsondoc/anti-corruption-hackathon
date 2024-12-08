import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";

export interface b_6_4_ThirdPartyElectronicAccountCrypto {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
    accountOrCryptoType: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա էլեկտրոնային հաշվի կամ կրիպտոարժույթի տեսակը"
    balanceAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա էլեկտրոնային հաշվի կամ կրիպտոարժույթի գումարը և արժույթը"
    sourceOfFunds: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա էլեկտրոնային հաշվի կամ կրիպտոարժույթի ծագման աղբյուրը"
    ownerName: string; // "Էլեկտրոնային հաշիվների և կրիպտոարժույթի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
    relationshipNature: string; // "Հայտարարատուի և երրորդ անձի միջև առկա կապի բնույթը"
}

export const parseThirdPartyElectronicAccountsAndCrypto = (
    vc: ValueClass
): FillRowsResult<b_6_4_ThirdPartyElectronicAccountCrypto> => {
    const names = {
        numbering: ["NN ը/կ"],
        declarantName: ["Հայտարարատուի անունը, ազգանունը, հայրանունը"],
        accountOrCryptoType: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա էլեկտրոնային հաշվի կամ կրիպտոարժույթի տեսակը"],
        balanceAndCurrency: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա էլեկտրոնային հաշվի կամ կրիպտոարժույթի գումարը և արժույթը"],
        sourceOfFunds: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա էլեկտրոնային հաշվի կամ կրիպտոարժույթի ծագման աղբյուրը"],
        ownerName: ["Էլեկտրոնային հաշիվնե��ի և կրիպտոարժույթի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"],
        relationshipNature: ["Հայտարարատուի և երրորդ անձի միջև առկա կապի բնույթը"],
    };

    return fillRows(names, vc);
};
