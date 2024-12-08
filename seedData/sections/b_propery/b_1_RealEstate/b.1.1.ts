import { ValueClass } from "../../../../src/parser/originalInterfaces";
import { fillRows, FillRowsResult, TargetToRealColumnNames } from "../../../../seedData/sections/tools/RowsSearcher";

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

export function parseRealEstateRows(vc: ValueClass): FillRowsResult<b_1_1_RealEstateRow> {

    const names: TargetToRealColumnNames = {
        numbering: ["NN ը/կ"], // "NN ը/կ"
        ownerName: ["Հայտարարատու սեփականատիրոջ անունը, ազգանունը, հայրանունը"], // "Հայտարարատու սեփականատիրոջ անունը, ազգանունը, հայրանունը"
        propertyType: ["Անշարժ գույքի տեսակը"], // "Անշարժ գույքի տեսակը"
        ownershipType: ["Սեփականության իրավունքի տեսակը"], // "Սեփականության իրավունքի տեսակը"
        ownerShare: ["Հայտարարատու սեփականատիրոջ բաժինը"], // "Հայտարարատու սեփականատիրոջ բաժինը"
        coOwnerShare: ["Համասեփականատիրոջ բաժինը"], // "Համասեփականատիրոջ բաժինը"
        coOwnerName: ["Համասեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"], // "Համասեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
        relationshipWithCoOwner: ["Հայտարարատուի և համասեփականատիրոջ միջև առկա կապի բնույթը"], // "Հայտարարատուի և համասեփականատիրոջ միջև առկա կապի բնույթը"
        locationAddress: ["Գտնվելու վայրի հասցեն"], // "Գտնվելու վայրի հասցեն"
        registrationNumber: ["Անշարժ գույքի հաշվառման համարը"], // "Անշարժ գույքի հաշվառման համարը"
        propertyArea: ["Անշարժ գույքի մակերեսը"], // "Անշարժ գույքի մակերեսը"
        acquisitionYear: ["Անշարժ գույքը ձեռք բերելու տարին", "Անշարժ գույքը ձեռք բերելու օրը, ամիսը, տարին"], // "Անշարժ գույքը ձեռք բերելու տարին"
        acquisitionMethod: ["Անշարժ գույքը ձեռք բերելու եղանակը"] // "Անշարժ գույքը ձեռք բերելու եղանակը"
    };

    return fillRows(names, vc);
};
