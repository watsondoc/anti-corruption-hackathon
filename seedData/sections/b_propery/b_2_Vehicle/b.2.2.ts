import { ValueClass } from "../../../../src/parser/originalInterfaces";
import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";

//Транспортное средство, фактически находящееся в распоряжении декларанта более 90 дней в течение отчетного периода или приобретенное от имени, в пользу или за счет декларанта, транспортное средство, принадлежащее третьему лицу на праве собственности, или транспортное средство, от которого он получает фактическую выгоду или которым владеет декларант
export interface b_2_2_DeclarantVehicle {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատի անունը, ազգանունը, հայրանունը"
    vehicleType: string; // "Տրանսպորտի տեսակը"
    makeAndModel: string; // "Մակնիշը, սերիան"
    yearOfManufacture: string; // "Թողարկման տարին"
    identificationNumber: string; // "Նույնականացման համարը"
    ownerName: string; // "Գույքի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
    relationshipWithOwner: string; // "Հայտարարատուի և սեփականատիրոջ միջև առկա կապի բնույթը"
}

export const parseDeclarantVehicles = (
    vc: ValueClass
): FillRowsResult<b_2_2_DeclarantVehicle> => {

    const names = {
        numbering: ["NN ը/կ"], // "NN ը/կ"
        declarantName: ["Հայտարարատի անունը, ազգանունը, հայրանունը"], // "Հայտարարատի անունը, ազգանունը, հայրանունը"
        vehicleType: ["Տրանսպորտի տեսակը"], // "Տրանսպորտի տեսակը"
        makeAndModel: ["Մակնիշը, սերիան"], // "Մակնիշը, սերիան"
        yearOfManufacture: ["Թողարկման տարին"], // "Թողարկման տարին"
        identificationNumber: ["Նույնականացման համարը"], // "Նույնականացման համարը"
        ownerName: ["Գույքի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"], // "Գույքի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
        relationshipWithOwner: ["Հայտարարատուի և սեփականատիրոջ միջև առկա կապի բնույթը"] // "Հայտարարատուի և սեփականատիրոջ միջև առկա կապի բնույթը"
    }

    return fillRows(names, vc);
}
