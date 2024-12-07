export interface b_2_1_TransportRow {
    numbering: number | null; // "NN ը/կ"
    ownerName: string; // "Հայտարարատու սեփականատիրոջ անունը, ազգանունը, հայրանունը"
    transportType: string; // "Տրանսպորտի միջոցի տեսակը"
    makeAndModel: string; // "Մակնիշը, սերիան"
    manufactureYear: string; // "Թողարկման տարին"
    identificationNumber: string; // "Նույնականացման համարը"
    acquisitionYear: string; // "Տրանսպորտի միջոցը ձեռք բերելու տարին"
    acquisitionMethod: string; // "Տրանսպորտի միջոցը ձեռքբերելու եղանակը"
}

// parseTransportRows parses given rows to b_2_1_TransportRow[] format

export const parseTransportRows = (
    rows: any[]
): b_2_1_TransportRow[] => {
    return rows.map((row) => ({
        numbering: row[0] || null,
        ownerName: row[1] || "",
        transportType: row[2] || "",
        makeAndModel: row[3] || "",
        manufactureYear: row[4] || "",
        identificationNumber: row[5] || "",
        acquisitionYear: row[6] || "",
        acquisitionMethod: row[7] || "",
    }));
};
