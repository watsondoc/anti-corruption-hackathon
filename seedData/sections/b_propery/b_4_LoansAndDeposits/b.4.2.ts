import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";

export interface b_4_2_DeclarantThirdPartyLoan {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
    loanInterestRate: string; // "Փոխառության տոկոսադրույքը"
    loanAmountAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա փոխառության գումարը և արժույթը"
    thirdPartyName: string; // "Երրորդ անձի անվանումը կամ անունը, ազգանունը, հայրանունը"
    relationshipNatureWithThirdParty: string; // "Հայտարարատուի և երրորդ անձի միջև առկա կապի բնույթը"
}

export const parseDeclarantThirdPartyLoan = (
    vc: ValueClass
): FillRowsResult<b_4_2_DeclarantThirdPartyLoan> => {
    const names = {
        numbering: ["NN ը/կ"],
        declarantName: ["Հայտարարատուի անունը, ազգանունը, հայրանունը"],
        loanInterestRate: ["Փոխառության տոկոսադրույքը"],
        loanAmountAndCurrency: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա փոխառության գումարը և արժույթը"],
        thirdPartyName: ["Երրորդ անձի անվանումը կամ անունը, ազգանունը, հայրանունը"],
        relationshipNatureWithThirdParty: ["Հայտարարատուի և երրորդ անձի միջև առկա կապի բնույթը"],
    }

    return fillRows(names, vc);
};
