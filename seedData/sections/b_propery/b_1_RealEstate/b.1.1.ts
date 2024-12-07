export interface b_1_1_RealEstateRow {
    numbering: number | null; // "NN ը/կ"
    ownerName: string; // "Հայտարարատու սեփականատիրոջ անունը, ազգանունը, հայրանունը"
    propertyType: string; // "Անշարժ գույքի տեսակը"
    ownershipType: string; // "Սեփականության իրավունքի տեսակը"
    ownerShare: string; // "Հայտարարատու սեփականատիրոջ բաժինը"
    coOwnerShare: string; // "Համասեփականատիրոջ բաժինը"
    coOwnerName: string; // "Համասեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
    relationshipWithCoOwner: string; // "Հայտարարատուի և համասեփականատիրոջ միջև առկա կապի բնույթը"
    locationAddress: string; // "Գտնվելու վայրի հասցեն"
    registrationNumber: string; // "Անշարժ գույքի հաշվառման համարը"
    propertyArea: string; // "Անշարժ գույքի մակերեսը"
    acquisitionYear: string; // "Անշարժ գույքը ձեռք բերելու տարին"
    acquisitionMethod: string; // "Անշարժ գույքը ձեռք բերելու եղանակը"
}

export function parseRealEstateRows(rows: any[]): b_1_1_RealEstateRow[] {
    return rows.map((row) => ({
        numbering: row[0] || null,
        ownerName: row[1] || "",
        propertyType: row[2] || "",
        ownershipType: row[3] || "",
        ownerShare: row[4] || "",
        coOwnerShare: row[5] || "",
        coOwnerName: row[6] || "",
        relationshipWithCoOwner: row[7] || "",
        locationAddress: row[8] || "",
        registrationNumber: row[9] || "",
        propertyArea: row[10] || "",
        acquisitionYear: row[11] || "",
        acquisitionMethod: row[12] || "",
    }));
};