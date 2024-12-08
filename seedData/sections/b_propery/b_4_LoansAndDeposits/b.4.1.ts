import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";

export interface b_4_1_DeclarantLoan {
    numbering: number | null; // "NN ը/կ"
    declarantLenderName: string; // "Հայտարարատու պարտատիրոջ անունը, ազգանունը, հայրանունը"
    borrowerName: string; // "Պարտապանի անվանումը կամ անունը, ազգանունը, հայրանունը"
    borrowerAddress: string; // "Պարտապանի հասցեն"
    relationshipNature: string; // "Կողմերի միջև առկա կապի բնույթը"
    loanInterestRate: string; // "Փոխառության տոկոսադրույքը"
    loanAmountAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա փոխառության գումարը և արժույթը"
}

export const parseDeclarantLoan = (
    vc: ValueClass
): FillRowsResult<b_4_1_DeclarantLoan> => {
    const names = {
        numbering: ["NN ը/կ"],
        declarantLenderName: ["Հայտարարատու պարտատիրոջ անունը, ազգանունը, հայրանունը"],
        borrowerName: ["Պարտապանի անվանումը կամ անունը, ազգանունը, հայրանունը"],
        borrowerAddress: ["Պարտապանի հասցեն"],
        relationshipNature: ["Կողմերի միջև առկա կապի բնույթը"],
        loanInterestRate: ["Փոխառության տոկոսադրույքը"],
        loanAmountAndCurrency: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա փոխառության գումարը և արժույթը"],
    }

    return fillRows(names, vc);
};
