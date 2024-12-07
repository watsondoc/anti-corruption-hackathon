export interface a_2_DeclarantFamilyMember {
    numbering: number | null; // "NN ը/կ"
    fullName: string; // "Անունը, ազգանունը, հայրանունը"
    relationship: string; // "Կապը հայտարարատու պաշտոնատար անձի հետ"
    dateOfBirth: string; // "Ծննդյան օրը, ամիսը, տարին"
    passportDetails: string; // "Անձնագրի տվյալները"
    publicServiceNumber: string; // "Հանրային ծառայությունների համարանիշը (առկայության դեպքում)"
    citizenship: string; // "Քաղաքացիությունը"
    registeredAddress: string; // "Հաշվառման հասցեն"
    residenceAddress: string; // "Բնակության հասցեն"
    position: string; // "Պաշտոնը (աշխատանքային գործունեությունը)"
    employer: string; // "Գործատուի անվանումը"
}

export const parseDeclarantFamilyMemberRows = (
    rows: any[]
): a_2_DeclarantFamilyMember[] => {
    return rows.map((row) => ({
        numbering: parseInt(row[0], 10) || null,
        fullName: row[1] || "",
        relationship: row[2] || "",
        dateOfBirth: row[3] || "",
        passportDetails: row[4] || "",
        publicServiceNumber: row[5] || "",
        citizenship: row[6] || "",
        registeredAddress: row[7] || "",
        residenceAddress: row[8] || "",
        position: row[9] || "",
        employer: row[10] || "",
    }));
};
