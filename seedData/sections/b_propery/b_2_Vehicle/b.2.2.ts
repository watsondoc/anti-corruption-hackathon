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
    rows: string[][]
): b_2_2_DeclarantVehicle[] => {
    return rows.map((row) => {
        const getValue = (searchString: string) => {
            const index = row.findIndex(cell => cell.includes(searchString));
            return index !== -1 ? row[index] : "";
        };

        return {
            numbering: parseInt(getValue("NN ը/կ"), 10) || null, // "NN ը/կ"
            declarantName: getValue("Հայտարարատի անունը, ազգանունը, հայրանունը"), // "Հայտարարատի անունը, ազգանունը, հայրանունը"
            vehicleType: getValue("Տրանսպորտի տեսակը"), // "Տրանսպորտի տեսակը"
            makeAndModel: getValue("Մակնիշը, սերիան"), // "Մակնիշը, սերիան"
            yearOfManufacture: getValue("Թողարկման տարին"), // "Թողարկման տարին"
            identificationNumber: getValue("Նույնականացման համարը"), // "Նույնականացման համարը"
            ownerName: getValue("Գույքի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"), // "Գույքի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
            relationshipWithOwner: getValue("Հայտարարատուի և սեփականատիրոջ միջև առկա կապի բնույթը") // "Հայտարարատուի և սեփականատիրոջ միջև առկա կապի բնույթը"
        };
    });
};
