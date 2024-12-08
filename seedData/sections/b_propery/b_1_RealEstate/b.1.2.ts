import { ValueClass } from "../../../../src/parser/originalInterfaces";
import { fillRows, FillRowsResult, TargetToRealColumnNames } from "../../../../seedData/sections/tools/RowsSearcher";

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
    vc: ValueClass
): FillRowsResult<b_1_2_DeclarantRealEstateRow> => {

    const names: TargetToRealColumnNames = {
        numbering: ["NN ը/կ"], // "NN ը/կ"
        declarantName: ["Հայտարարատուի անունը, ազգանունը, հայրանունը"], // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
        propertyType: ["Անշարժ գույքի տեսակը"], // "Անշարժ գույքի տեսակը"
        propertyAddress: ["Գույքի գտնվելու վայրի հասցեն"], // "Գույքի գտնվելու վայրի հասցեն"
        propertyArea: ["Անշարժ գույքի մակերեսը"], // "Անշարժ գույքի մակերեսը"
        registrationNumber: ["Անշարժ գույքի հաշվառման համարը"], // "Անշարժ գույքի հաշվառման համարը"
        ownerName: ["Գույքի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"], // "Գույքի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
        relationshipWithOwner: ["Հայտարարատուի և սեփականատիրոջ միջև առկա կապի բնույթը"] // "Հայտարարատուի և սեփականատիրոջ միջև առկա կապի բնույթը"
    };

    return fillRows(names, vc);
};
