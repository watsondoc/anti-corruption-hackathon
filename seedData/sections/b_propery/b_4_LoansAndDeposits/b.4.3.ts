import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";

export interface b_4_3_BankDeposit {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատու պարտատիրոջ անունը, ազգանունը, հայրանունը"
    bankName: string; // "Բանկի անվանումը (ՀՀ territory-ից դուրս գտնվող բանկի դեպքում)"
    bankLocation: string; // "Բանկի գտնվելու վայրը (ՀՀ territory-ից դուրս գտնվող բանկի դեպքում)"
    depositAmountAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ տվյալ բանկում առկա ավանդի գումարը և արժույթը"
}

export const parseBankDeposits = (
    vc: ValueClass
): FillRowsResult<b_4_3_BankDeposit> => {
    const names = {
        numbering: ["NN ը/կ"],
        declarantName: ["Հայտարարատու պարտատիրոջ անունը, ազգանունը, հայրանունը"],
        bankName: ["Բանկի անվանումը (ՀՀ territory-ից դուրս գտնվող բանկի դեպքում)"],
        bankLocation: ["Բանկի գտնվելու վայրը (ՀՀ territory-ից դուրս գտնվող բանկի դեպքում)"],
        depositAmountAndCurrency: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ տվյալ բանկում առկա ավանդի գումարը և արժույթը"],
    }

    return fillRows(names, vc);
};
