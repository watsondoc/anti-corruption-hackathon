import { fillRows } from "../../../../seedData/sections/tools/RowsSearcher";
import { FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";

export interface b_3_4_DeclarantDebtSecuritiesThirdParty {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
    securityType: string; // "Արժեթղթի տեսակը"
    currentValue: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա պարտքային և այլ արժեթղթերի արժեքը(գինը) և արժույթը"
    ownerName: string; // "Պարտքային և այլ արժեթղթերի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
    relationshipNature: string; // "Հայտարարատուի և սեփականատիրոջ միջև առկա կապի բնույթը"
}

export const parseDeclarantDebtSecuritiesThirdParty = (
    vc: ValueClass
): FillRowsResult<b_3_4_DeclarantDebtSecuritiesThirdParty> => {

    const names = {
        numbering: ["NN ը/կ"],
        declarantName: ["Հայտարարատուի անունը, ազգանունը, հայրանունը"],
        securityType: ["Արժեթղթի տեսակը"],
        currentValue: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա պարտքային և այլ արժեթղթերի արժեքը(գինը) և արժույթը"],
        ownerName: ["Պարտքային և այլ արժեթղթերի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"],
        relationshipNature: ["Հայտարարատուի և սեփականատիրոջ միջև առկա կապի բնույթը"],
    }

    return fillRows(names, vc);
};
