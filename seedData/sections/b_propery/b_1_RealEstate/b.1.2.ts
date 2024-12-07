export interface b_1_2_DeclarantRealEstateRow {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
    propertyType: string; // "Անշարժ գույքի տեսակը"
    propertyAddress: string; // "Գույքի գտնվելու վայրի հասցեն"
    propertyArea: string; // "Անշարժ գույքի մակերեսը"
    registrationNumber: string; // "Անշարժ գույքի հաշվառման համարը"
    ownerName: string; // "Գույքի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
    relationshipWithOwner: string; // "Հայտարարատուի և սեփականատիրոջ միջև առկա կապի բնույթը"
}

export const parseDeclarantRealEstateRows = (
    rows: any[]
): b_1_2_DeclarantRealEstateRow[] => {
    return rows.map((row) => ({
        numbering: row[0] || null,
        declarantName: row[1] || "",
        propertyType: row[2] || "",
        propertyAddress: row[3] || "",
        propertyArea: row[4] || "",
        registrationNumber: row[5] || "",
        ownerName: row[6] || "",
        relationshipWithOwner: row[7] || "",
    }));
};
