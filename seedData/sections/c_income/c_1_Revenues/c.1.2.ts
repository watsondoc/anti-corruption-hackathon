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
    return rows.map((row) => {
        const getValue = (searchString: string) => {
            const index = row.findIndex(cell => cell.includes(searchString));
            return index !== -1 ? row[index] : "";
        };

        return {
            numbering: parseInt(getValue("NN ը/կ"), 10) || null, // "NN ը/կ"
            recipientName: getValue("Եկամուտ ստացող հայտարարատուի անունը, ազգանունը, հայրանունը"), // "Եկամուտ ստացող հայտարարատուի անունը, ազգանունը, հայրանունը"
            lenderName: getValue("Վարկատուի կամ փոխատուի անվանումը կամ անունը, ազգանունը և հայրանունը"), // "Վարկատուի կամ փոխատուի անվանումը կամ անունը, ազգանունը և հայրանունը"
            lenderAddress: getValue("Վարկատուի կամ փոխատուի հասցեն"), // "Վարկատուի կամ փոխատուի հասցեն"
            creditBalance: getValue("Փոխառության մնացորդի չափը"), // "Փոխառության մնացորդի չափը"
            creditInterestRate: getValue("Փոխառության տոկոսադրույքը"), // "Փոխառության տոկոսադրույքը"
            creditPurpose: getValue("Փոխառության նպատակային նշանակությունը"), // "Փոխառության նպատակային նշանակությունը"
            loanBalance: getValue("Վարկի մայր գումարի մնացորդի չափը"), // "Վարկի մայր գումարի մնացորդի չափը"
            loanPurpose: getValue("Վարկի նպատակային նշանակությունը"), // "Վարկի նպատակային նշանակությունը"
            mortgageSubject: getValue("Հիպոտեկի դեպքում՝ հիպոտեկի առարկան"), // "Հիպոտեկի դեպքում՝ հիպոտեկի առարկան"
            mortgageLocation: getValue("Հիպոտեկի դեպքում՝ հիպոտեկի առարկայի գտնվելու վայրը") // "Հիպոտեկի դեպքում՝ հիպոտեկի առարկայի գտնվելու վայրը"
        };
    });
};
