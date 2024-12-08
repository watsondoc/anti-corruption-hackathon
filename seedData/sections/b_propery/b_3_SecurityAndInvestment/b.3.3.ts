import { fillRows } from "../../../../seedData/sections/tools/RowsSearcher";
import { FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";

export interface b_3_3_DeclarantDebtSecurities {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատու սեփականատիրոջ անունը, ազգանունը, հայրանունը"
    securityType: string; // "Արժեթղթի տեսակը"
    acquisitionDate: string; // "Ձեռքբերման ամսաթիվը"
    acquisitionMethod: string; // "Ձեռք բերելու եղանակը"
    counterpartyInfo: string; // "Գործարքի մյուս կողմի անվանումը կամ անունը, ազգանունը, հայրանունը, հասցեն"
    relationshipNature: string; // "Կողմերի միջև առկա կապի բնույթը"
    currentValue: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա պարտքային և այլ արժեթղթերի արժեքը(գինը) և արժույթը"
}

export const parseDeclarantDebtSecurities = (
    vc: ValueClass
): FillRowsResult<b_3_3_DeclarantDebtSecurities> => {

    const names = {
        numbering: ["NN ը/կ"],
        declarantName: ["Հայտարարատու սեփականատիրոջ անունը, ազգանունը, հայրանունը"],
        securityType: ["Արժեթղթի տեսակը"],
        acquisitionDate: ["Ձեռքբերման ամսաթիվը"],
        acquisitionMethod: ["Ձեռք բերելու եղանակը"],
        counterpartyInfo: ["Գործարքի մյուս կողմի անվանումը կամ անունը, ազգանունը, հայրանունը, հասցեն"],
        relationshipNature: ["Կողմերի միջև առկա կապի բնույթը"],
        currentValue: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա պարտքային և այլ արժեթղթերի արժեքը(գինը) և արժույթը"],
    }

    return fillRows(names, vc);
};
