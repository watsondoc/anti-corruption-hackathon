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

export const parseLoanAndCreditBalance = (rows: string[][]): c_1_2_LoanAndCreditBalance[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null, // "NN ը/կ"
        recipientName: row[1] || "", // "Եկամուտ ստացող հայտարարատուի անունը, ազգանունը, հայրանունը"
        lenderName: row[2] || "", // "Վարկատուի կամ փոխատուի անվանումը կամ անունը, ազգանունը և հայրանունը"
        lenderAddress: row[3] || "", // "Վարկատուի կամ փոխատուի հասցեն"
        creditBalance: row[4] || "", // "Փոխառության մնացորդի չափը"
        creditInterestRate: row[5] || "", // "Փոխառության տոկոսադրույքը"
        creditPurpose: row[6] || "", // "Փոխառության նպատակային նշանակությունը"
        loanBalance: row[7] || "", // "Վարկի մայր գումարի մնացորդի չափը"
        loanPurpose: row[8] || "", // "Վարկի նպատակային նշանակությունը"
        mortgageSubject: row[9] || "", // "Հիպոտեկի դեպքում՝ հիպոտեկի առարկան"
        mortgageLocation: row[10] || "" // "Հիպոտեկի դեպքում՝ հիպոտեկի առարկայի գտնվելու վայրը"
    }));
};
