// Имущество (драгоценное имущество)стоимостью более четырех миллионов драмов или эквивалента в иностранной валюте, имеющееся на день вступления в должность или прекращения ее действия.
export interface b_5_1_ValuableProperty {
    numbering: number | null; // "NN ը/կ"
    ownerName: string; // Declarant owner's name (e.g., "Հայտարարատու սեփականատիրոջ անունը, ազգանունը, հայրանունը")
    propertyType: string; // Type of valuable property
    description: string; // Description of the property
    acquisitionYear: string; // Year of acquisition
    acquisitionMethod: string; // Method of acquisition
    valueAndCurrency: string; // Value and currency (e.g., "4,000,000 AMD")
}

export const parseValuableProperties = (
    rows: string[][]
): b_5_1_ValuableProperty[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null,
        ownerName: row[1] || "",
        propertyType: row[2] || "",
        description: row[3] || "",
        acquisitionYear: row[4] || "",
        acquisitionMethod: row[5] || "",
        valueAndCurrency: row[6] || "",
    }));
};
