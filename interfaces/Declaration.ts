import { b_5_1_ValuableProperty, b_5_2_DeclarantValuableProperty } from "../seedData/sections/b_propery/b_5_ExpensiveProperty";
import { a_1_DeclarationPersonInfo } from "../seedData/sections/a_general/a_1_perfonInfo/a_1_DeclarationPersonInfo";
import { a_2_DeclarantFamilyMember } from "../seedData/sections/a_general/a_2_family/a_2_DeclarantFamilyMember";
import { a_3_DeclarantNonResidentRelative } from "../seedData/sections/a_general/a_3_/a_3_DeclarantNonResidentRelative";
import { b_1_1_RealEstateRow } from "../seedData/sections/b_propery/b_1_RealEstate/b.1.1";
import { b_1_2_DeclarantRealEstateRow } from "../seedData/sections/b_propery/b_1_RealEstate/b.1.2";
import { b_2_1_TransportRow } from "../seedData/sections/b_propery/b_2_Vehicle/b.2.1";
import { b_2_2_DeclarantVehicle } from "../seedData/sections/b_propery/b_2_Vehicle/b.2.2";
import { b_3_1_EquitySecuritiesAndInvestmentsRow } from "../seedData/sections/b_propery/b_3_SecurityAndInvestment/b.3.1";
import { b_3_2_DeclarantThirdPartyInvestments } from "../seedData/sections/b_propery/b_3_SecurityAndInvestment/b.3.2";
import { b_3_3_DeclarantDebtSecurities } from "../seedData/sections/b_propery/b_3_SecurityAndInvestment/b.3.3";
import { b_3_4_DeclarantDebtSecuritiesThirdParty } from "../seedData/sections/b_propery/b_3_SecurityAndInvestment/b.3.4";
import { b_4_1_DeclarantLoan } from "../seedData/sections/b_propery/b_4_LoansAndDeposits/b.4.1";
import { b_4_2_DeclarantThirdPartyLoan } from "../seedData/sections/b_propery/b_4_LoansAndDeposits/b.4.2";
import { b_4_3_BankDeposit } from "../seedData/sections/b_propery/b_4_LoansAndDeposits/b.4.3";
import { b_4_4_ThirdPartyBankDeposit } from "../seedData/sections/b_propery/b_4_LoansAndDeposits/b.4.4";
import { b_6_1_BankAccountBalance, b_6_2_ThirdPartyBankAccountBalance, b_6_3_ElectronicAccountCrypto, b_6_4_ThirdPartyElectronicAccountCrypto, b_6_5_CashHoldings, b_6_6_CashHoldingsThirdParty } from "../seedData/sections/b_propery/b_6_FinancialMeans";
import { c_1_1_ReportingPeriodIncome, c_1_2_LoanAndCreditBalance } from "../seedData/sections/c_income/c_1_Revenues";

export interface Declaration {
    id: string;
    name: string;
    declarant: string;
    declarantType: string;
    institutionGroup: string;
    institution: string;
    position: string;
    submissionDate: string;
    type: string;
    year: number;
    a_generals: A_GeneralSection;
    b_properties: B_PropertySection;
    c_incomes: C_IncomeSection;
    d_interests: D_InterestsSection | null;
    e_expenses: E_ExpenseSection | null;
}

export interface A_GeneralSection {
    a_1_personInfo: a_1_DeclarationPersonInfo;
    a_2_familyMembers: a_2_DeclarantFamilyMember[];
    a_3_nonResidentRelatives: a_3_DeclarantNonResidentRelative[];
}

export interface B_PropertySection {
    b_1_realEstate: {
        b_1_1_realEstates: b_1_1_RealEstateRow[];
        b_1_2_declarantRealEstates: b_1_2_DeclarantRealEstateRow[];
    }
    b_2_vehicle: {
        b_2_1_transports: b_2_1_TransportRow[];
        b_2_2_declarantVehicles: b_2_2_DeclarantVehicle[];
    },
    b_3_securities: {
        b_3_1_equitySecuritiesAndInvestments: b_3_1_EquitySecuritiesAndInvestmentsRow[];
        b_3_2_declarantThirdPartyInvestments: b_3_2_DeclarantThirdPartyInvestments[];
        b_3_3_declarantDebtSecurities: b_3_3_DeclarantDebtSecurities[];
        b_3_4_declarantDebtSecuritiesThirdParty: b_3_4_DeclarantDebtSecuritiesThirdParty[];
    },
    b_4_loansAndDeposits: {
        b_4_1_loans: b_4_1_DeclarantLoan[];
        b_4_2_declarantThirdPartyLoans: b_4_2_DeclarantThirdPartyLoan[];
        b_4_3_bankDeposits: b_4_3_BankDeposit[];
        b_4_4_declarantThirdPartyDeposits: b_4_4_ThirdPartyBankDeposit[];
    },
    b_5_expensiveProperty: {
        b_5_1_valuableProperties: b_5_1_ValuableProperty[],
        b_5_2_declarantValuableProperties: b_5_2_DeclarantValuableProperty[]
    },
    b_6_financialMeans: {
        b_6_1_bankAccountBalances: b_6_1_BankAccountBalance[],
        b_6_2_thirdPartyBankAccountBalances: b_6_2_ThirdPartyBankAccountBalance[],
        b_6_3_electronicAccountCrypto: b_6_3_ElectronicAccountCrypto[],
        b_6_4_thirdPartyElectronicAccountCrypto: b_6_4_ThirdPartyElectronicAccountCrypto[],
        b_6_5_cashHoldings: b_6_5_CashHoldings[],
        b_6_6_cashHoldingsThirdParty: b_6_6_CashHoldingsThirdParty[]
    }
}

export interface C_IncomeSection {
    c_1_revenues: {
        c_1_1_reportingPeriodIncomes: c_1_1_ReportingPeriodIncome[],
        c_1_2_loanAndCreditBalances: c_1_2_LoanAndCreditBalance[]
    }
    c_2_incomeAdditionalInformationJson: string;
}

// TBD
export interface D_InterestsSection {

}

// TBD
export interface E_ExpenseSection {

}

// export interface Content {
//     title: string;
//     grids: Grid[];
//     empty: boolean;
// }

// export interface Grid {
//     title: string;
//     category: string;
//     instanceId?: number;
//     rows: Row[];
//     empty: boolean;
// }

// export interface Row {
//     cells: Cell[];
//     empty: boolean;
// }

// export interface Cell {
//     type: Type;
//     title: string;
//     value: ValueClass | string;
//     properties: Properties;
// }

// export interface Properties {
//     type: Type;
//     xs: number;
//     s: number;
//     m: number;
// }

// export enum Type {
//     String = "STRING",
//     Table = "TABLE",
// }

// export interface ValueClass {
//     headerItems: HeaderItem[];
//     rows: Array<string[]>;
//     footerItems: FooterItem[];
// }

// export interface FooterItem {
//     value: string;
//     colSpan: number;
// }

// export interface HeaderItem {
//     name: string;
//     isNumbering: boolean;
//     colSpan: number;
// }
