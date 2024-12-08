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

export const parseReportingPeriodIncome = (rows: string[][]): c_1_1_ReportingPeriodIncome[] => {
    return rows.map((row) => ({
        numbering: parseInt(row.find(r => r.includes("NN ը/կ")) || "", 10) || null, // "NN ը/կ"
        recipientName: row.find(r => r.includes("Եկամուտ ստացող հայտարարատուի անունը, ազգանունը, հայրանունը")) || "", // "Եկամուտ ստացող հայտարարատուի անունը, ազգանունը, հայրանունը"
        incomeType: row.find(r => r.includes("Եկամտի տեսակը")) || "", // "Եկամտի տեսակը"
        payerName: row.find(r => r.includes("Եկամուտ վճարող կազմակերպության անվանումը կամ ֆիզիկական անձի անունը, ազգանունը և հայրանունը")) || "", // "Եկամուտ վճարող կազմակերպության անվանումը կամ ֆիզիկական անձի անունը, ազգանունը և հայրանունը"
        payerAddress: row.find(r => r.includes("Եկամուտ վճարողի հասցեն")) || "", // "Եկամուտ վճարողի հասցեն"
        relationshipNature: row.find(r => r.includes("Հայտարարատուի և եկամուտ վճարողի միջև առկա կապի բնույթը")) || "", // "Հայտարարատուի և եկամուտ վճարողի միջև առկա կապի բնույթը"
        monetaryIncomeAmountAndCurrency: row.find(r => r.includes("Ստացված եկամտի գումարը և արժույթը")) || "", // "Ստացված եկամտի գումարը և արժույթը"
        incomeInKind: row.find(r => r.includes("Բնամթերային ձևով ստացված եկամուտը")) || "", // "Բնամթերային ձևով ստացված եկամուտը"
    }));
};
