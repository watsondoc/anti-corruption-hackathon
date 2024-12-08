import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";

export interface b_4_4_ThirdPartyBankDeposit {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
    bankName: string; // "Բանկի անվանումը (ՀՀ territory-ից դուրս գտնվող բանկի դեպքում)"
    bankLocation: string; // "Բանկի գտնվելու վայրը (ՀՀ territory-ից դուրս գտնվող բանկի դեպքում)"
    depositAmountAndCurrency: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ տվյալ բանկում առկա բանկային ավանդի գումարը և արժույթը"
    thirdPartyName: string; // "Երրորդ անձի անվանումը կամ անունը, ազգանունը, հայրանունը"
    relationshipWithThirdParty: string; // "Հայտարարատուի և երրորդ անձի միջև առկա կապի բնույթը"
}

export const parseThirdPartyBankDeposits = (
    vc: ValueClass
): FillRowsResult<b_4_4_ThirdPartyBankDeposit> => {
    const names = {
        numbering: ["NN ը/կ"],
        declarantName: ["Հայտարարատուի անունը, ազգանունը, հայրանունը"],
        bankName: ["Բանկի անվանումը (ՀՀ territory-ից դուրս գտնվող բանկի դեպքում)"],
        bankLocation: ["Բանկի գտնվելու վայրը (ՀՀ territory-ից դուրս գտնվող բանկի դեպքում)"],
        depositAmountAndCurrency: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ տվյալ բանկում առկա բանկային ավանդի գումարը և արժույթը"],
        thirdPartyName: ["Երրորդ անձի անվանումը կամ անունը, ազգանունը, հայրանունը"],
        relationshipWithThirdParty: ["Հայտարարատուի և երրորդ անձի միջև առկա կապի բնույթը"],
    }

    return fillRows(names, vc);
};
