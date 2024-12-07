
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
    rows: any[]
): b_2_2_DeclarantVehicle[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null,
        declarantName: row[1] || "",
        vehicleType: row[2] || "",
        makeAndModel: row[3] || "",
        yearOfManufacture: row[4] || "",
        identificationNumber: row[5] || "",
        ownerName: row[6] || "",
        relationshipWithOwner: row[7] || "",
    }));
};
