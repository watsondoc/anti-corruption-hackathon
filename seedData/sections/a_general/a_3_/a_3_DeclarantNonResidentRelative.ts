export interface a_3_DeclarantNonResidentRelative {
    numbering: number | null; // "NN ը/կ"
    relationship: string; // "Կապը հայտարարատու  պաշտոնատար անձի հետ"
    fullName: string; // "Անունը, ազգանունը, հայրանունը"
    dateOfBirth: string; // "Ծննդյան օրը, ամիսը, տարին"
}

export const parseDeclarantNonResidentRelativeRows = (
    rows: any[]
): a_3_DeclarantNonResidentRelative[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null,
        relationship: row[1] || "",
        fullName: row[2] || "",
        dateOfBirth: row[3] || "",
    }));
};
