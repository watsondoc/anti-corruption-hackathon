import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";

export interface c_1_1_ReportingPeriodIncome {
    numbering: number | null; // "NN ը/կ"
    incomeType: string; // "Եկամտի տեսակը"
    recipientName: string; // "Եկամուտ ստացող հայտարարատուի անունը, ազգանունը, հայրանունը"
    payerName: string; // "Եկամուտ վճարող կազմակերպության անվանումը կամ ֆիզի��ական անձի անունը, ազգանունը և հայրանունը"
    payerAddress: string; // "Եկամուտ վճարողի հասցեն"
    relationshipNature: string; // "Հայտարարատուի և եկամուտ վճարողի միջև առկա կապի բնույթը"
    monetaryIncomeAmountAndCurrency: string; // "Ստացված եկամտի գումարը և արժույթը"
    incomeInKind: string; // "Բնամթերային ձևով ստացված եկամուտը"
}

// 3_146841

export const parseReportingPeriodIncome = (
    vc: ValueClass
): FillRowsResult<c_1_1_ReportingPeriodIncome> => {
    const names = {
        numbering: ["NN ը/կ"],
        incomeType: ["Եկամտի տեսակը"],
        recipientName: ["Եկամուտ ստացող հայտարարատուի անունը, ազգանունը, հայրանունը"],
        payerName: ["Եկամուտ վճարող կազմակերպության անվանումը կամ ֆիզի��ական անձի անունը, ազգանունը և հայրանունը"],
        payerAddress: ["Եկամուտ վճարողի հասցեն"],
        relationshipNature: ["Հայտարարատուի և եկամուտ վճարողի միջև առկա կապի բնույթը"],
        monetaryIncomeAmountAndCurrency: ["Ստացված եկամտի գումարը և արժույթը"],
        incomeInKind: ["Բնամթերային ձևով ստացված եկամուտը"],
    }

    return fillRows(names, vc);
};
