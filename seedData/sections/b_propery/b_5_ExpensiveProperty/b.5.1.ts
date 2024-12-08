import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";

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
    vc: ValueClass
): FillRowsResult<b_5_1_ValuableProperty> => {
    const names = {
        numbering: ["NN ը/կ"],
        ownerName: ["Declarant owner's name (e.g., \"Հայտարարատու սեփականատիրոջ անունը, ազգանունը, հայրանունը\")"],
        propertyType: ["Type of valuable property"],
        description: ["Description of the property"],
        acquisitionYear: ["Year of acquisition"],
        acquisitionMethod: ["Method of acquisition"],
        valueAndCurrency: ['Value and currency (e.g., "4,000,000 AMD")'],
    }

    return fillRows(names, vc);
};
