
export interface a_1_DeclarationPersonInfo {
  fullName: string; // row 1
  birthDate: string; // row 2
  socialSecurityNumber: string; // row 3
  registrationAddress: string; // row 4
  actualResidenceAddress: string; // row 5
  organizationName: string; // row 6
  position: string; // row 7
  positionStartDate: string; // row 8
  emailAndPhone: string; // row 9
  declarationDate: string; // row 10
}

export function parseDeclarationPersonInfo(rows: string[][]): a_1_DeclarationPersonInfo {
  return {
    fullName: rows[0][2],
    birthDate: rows[1][2],
    socialSecurityNumber: rows[2][2],
    registrationAddress: rows[3][2],
    actualResidenceAddress: rows[4][2],
    organizationName: rows[5][2],
    position: rows[6][2],
    positionStartDate: rows[7][2],
    emailAndPhone: rows[8][2],
    declarationDate: rows[9][2]
  };
}