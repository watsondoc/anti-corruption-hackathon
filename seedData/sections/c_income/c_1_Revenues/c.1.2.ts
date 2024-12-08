import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";

export interface c_1_2_LoanAndCreditBalance {
    numbering: number | null; // "NN ը/կ"
    recipientName: string; // "Եկամուտ ստացող հայտարարատուի անունը, ազգանունը, հայրանունը"
    lenderName: string; // "Վարկատուի կամ փոխատուի անվանումը կամ անունը, ազգանունը և հայրանունը"
    lenderAddress: string; // "Վարկատուի կամ փոխատուի հասցեն"
    creditBalance: string; // "Փոխառության մնացորդի չափը"
    creditInterestRate: string; // "Փոխառության տոկոսադրույքը"
    creditPurpose: string; // "Փոխառության նպատակային նշանակությունը"
    loanBalance: string; // "Վարկի մայր գումարի մնացորդի չափը"
    loanPurpose: string; // "Վարկի նպատակային նշանակությունը"
    mortgageSubject: string; // "Հիպոտեկի դեպքում՝ հիպոտեկի առարկան"
    mortgageLocation: string; // "Հիպոտեկի դեպքում՝ հիպոտեկի առարկայի գտնվելու վայրը"
}

export const parseLoanAndCreditBalance = (
    vc: ValueClass
): FillRowsResult<c_1_2_LoanAndCreditBalance> => {
    const names = {
        numbering: ["NN ը/կ"],
        recipientName: ["Եկամուտ ստացող հայտարարատուի անունը, ազգանունը, հայրանունը"],
        lenderName: ["Վարկատուի կամ փոխատուի անվանումը կամ անունը, ազգանունը և հայրանունը"],
        lenderAddress: ["Վարկատուի կամ փոխատուի հասցեն"],
        creditBalance: ["Փոխառության մնացորդի չափը"],
        creditInterestRate: ["Փոխառության տոկոսադրույքը"],
        creditPurpose: ["Փոխառության նպատակային նշանակությունը"],
        loanBalance: ["Վարկի մայր գումարի մնացորդի չափը"],
        loanPurpose: ["Վարկի նպատակային նշանակությունը"],
        mortgageSubject: ["Հիպոտեկի դեպքում՝ հիպոտեկի առարկան"],
        mortgageLocation: ["Հիպոտեկի դեպքում՝ հիպոտեկի առարկայի գտնվելու վայրը"]
    };

    return fillRows(names, vc);
};
