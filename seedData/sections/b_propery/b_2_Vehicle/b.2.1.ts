import { ValueClass } from "../../../../src/parser/originalInterfaces";
import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";

export interface b_2_1_TransportRow {
    numbering: number | null; // "NN ը/կ"
    ownerName: string; // "Հայտարարատու սեփականատիրոջ անունը, ազգանունը, հայրանունը"
    transportType: string; // "Տրանսպորտի միջոցի տեսակը"
    makeAndModel: string; // "Մակնիշը, սերիան"
    manufactureYear: string; // "Թողարկման տարին"
    identificationNumber: string; // "Նույնականացման համարը"
    acquisitionDate: string; // "Տրանսպորտի միջոցը ձեռք բերելու տարին"
    acquisitionMethod: string; // "Տրանսպորտի միջոցը ձեռքբերելու եղանակը"
    availableAtEndOfYear: string // Առկա է տվյալ տարվա վերջում
}

// parseTransportRows parses given rows to b_2_1_TransportRow[] format

export const parseTransportRows = (
    vc: ValueClass
): FillRowsResult<b_2_1_TransportRow> => {

    const names = {
        numbering: ["NN ը/կ"], // "NN ը/կ"
        ownerName: ["Հայտարարատու սեփականատիրոջ անունը, ազգանունը, հայրանունը"], // "Հայտարարատու սեփականատիրոջ անունը, ազգանունը, հայրանունը"
        transportType: ["Տրանսպորտի միջոցի տեսակը"], // "Տրանսպորտի միջոցի տեսակը"
        makeAndModel: ["Մակնիշը, սերիան"], // "Մակնիշը, սերիան"
        manufactureYear: ["Թողարկման տարին"], // "Թողարկման տարին"
        identificationNumber: ["Նույնականացման համարը"], // "Նույնականացման համարը"
        acquisitionDate: ["Տրանսպորտի միջոցը ձեռք բերելու տարին", "Տրանսպորտի միջոցը ձեռք բերելու օրը, ամիսը, տարին"], // "Տրանսպորտի միջոցը ձեռք բերելու տարին"
        acquisitionMethod: ["Տրանսպորտի միջոցը ձեռքբերելու եղանակը", "Տրանսպորտի միջոցը ձեռք բերելու եղանակը"], // "Տրանսպորտի միջոցը ձեռքբերելու եղանակը",
        availableAtEndOfYear: ['Առկա է տվյալ տարվա վերջում']
    }

    return fillRows(names, vc);
}
