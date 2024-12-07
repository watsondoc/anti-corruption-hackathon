export interface c_1_1_ReportingPeriodIncome {
    numbering: number | null; // "NN ը/կ"
    recipientName: string; // "Եկամուտ ստացող հայտարարատուի անունը, ազգանունը, հայրանունը"
    incomeType: string; // "Եկամտի տեսակը"
    payerName: string; // "Եկամուտ վճարող կազմակերպության անվանումը կամ ֆիզիկական անձի անունը, ազգանունը և հայրանունը"
    payerAddress: string; // "Եկամուտ վճարողի հասցեն"
    relationshipNature: string; // "Հայտարարատուի և եկամուտ վճարողի միջև առկա կապի բնույթը"
    monetaryIncomeAmountAndCurrency: string; // "Ստացված եկամտի գումարը և արժույթը"
    incomeInKind: string; // "Բնամթերային ձևով ստացված եկամուտը"
}

export const parseReportingPeriodIncome = (rows: string[][]): c_1_1_ReportingPeriodIncome[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null, // "NN ը/կ"
        recipientName: row[1] || "", // "Եկամուտ ստացող հայտարարատուի անունը, ազգանունը, հայրանունը"
        incomeType: row[2] || "", // "Եկամտի տեսակը"
        payerName: row[3] || "", // "Եկամուտ վճարող կազմակերպության անվանումը կամ ֆիզիկական անձի անունը, ազգանունը և հայրանունը"
        payerAddress: row[4] || "", // "Եկամուտ վճարողի հասցեն"
        relationshipNature: row[5] || "", // "Հայտարարատուի և եկամուտ վճարողի միջև առկա կապի բնույթը"
        monetaryIncomeAmountAndCurrency: row[6] || "", // "Ստացված եկամտի գումարը և արժույթը"
        incomeInKind: row[7] || "", // "Բնամթերային ձևով ստացված եկամուտը"
    }));
};
