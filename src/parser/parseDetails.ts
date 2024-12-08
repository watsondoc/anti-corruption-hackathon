import { DeclarationCategory } from "../../interfaces/DeclarationCategory";
import { A_GeneralSection, B_PropertySection, C_IncomeSection, D_InterestsSection, E_ExpenseSection } from "../../interfaces/Declaration";
import { Content, Declaration, ValueClass } from "./originalInterfaces";
import { parseDeclarationPersonInfo } from "../../seedData/sections/a_general/a_1_perfonInfo/a_1_DeclarationPersonInfo";
import { a_2_DeclarantFamilyMember } from "../../seedData/sections/a_general/a_2_family/a_2_DeclarantFamilyMember";
import { parseDeclarantFamilyMemberRows } from "../../seedData/sections/a_general/a_2_family/a_2_DeclarantFamilyMember";
import { a_3_DeclarantNonResidentRelative, parseDeclarantNonResidentRelativeRows } from "../../seedData/sections/a_general/a_3_/a_3_DeclarantNonResidentRelative";
import { b_1_1_RealEstateRow, parseRealEstateRows } from "../../seedData/sections/b_propery/b_1_RealEstate/b.1.1";
import { b_2_1_TransportRow, parseTransportRows } from "../../seedData/sections/b_propery/b_2_Vehicle/b.2.1";
import { b_3_1_EquitySecuritiesAndInvestmentsRow, parseEquitySecuritiesAndInvestmentsRows } from "../../seedData/sections/b_propery/b_3_SecurityAndInvestment/b.3.1";
import { b_1_2_DeclarantRealEstateRow, parseDeclarantRealEstateRows } from "../../seedData/sections/b_propery/b_1_RealEstate/b.1.2";
import { b_2_2_DeclarantVehicle, parseDeclarantVehicles } from "../../seedData/sections/b_propery/b_2_Vehicle/b.2.2";
import { b_3_2_DeclarantThirdPartyInvestments, parseDeclarantThirdPartyInvestments } from "../../seedData/sections/b_propery/b_3_SecurityAndInvestment/b.3.2";
import { b_3_3_DeclarantDebtSecurities, parseDeclarantDebtSecurities } from "../../seedData/sections/b_propery/b_3_SecurityAndInvestment/b.3.3";
import { b_3_4_DeclarantDebtSecuritiesThirdParty, parseDeclarantDebtSecuritiesThirdParty } from "../../seedData/sections/b_propery/b_3_SecurityAndInvestment/b.3.4";
import { b_4_1_DeclarantLoan, b_4_2_DeclarantThirdPartyLoan, b_4_3_BankDeposit, b_4_4_ThirdPartyBankDeposit, parseBankDeposits, parseDeclarantLoan, parseDeclarantThirdPartyLoan, parseThirdPartyBankDeposits } from "../../seedData/sections/b_propery/b_4_LoansAndDeposits";
import { b_5_1_ValuableProperty, parseValuableProperties, b_5_2_DeclarantValuableProperty, parseDeclarantValuableProperties } from "../../seedData/sections/b_propery/b_5_ExpensiveProperty";
import { b_6_1_BankAccountBalance, b_6_2_ThirdPartyBankAccountBalance, b_6_3_ElectronicAccountCrypto, b_6_4_ThirdPartyElectronicAccountCrypto, b_6_5_CashHoldings, b_6_6_CashHoldingsThirdParty, parseBankAccountBalances, parseCashHoldings, parseCashHoldingsThirdParty, parseElectronicAccountsAndCrypto, parseThirdPartyBankAccountBalances, parseThirdPartyElectronicAccountsAndCrypto } from "../../seedData/sections/b_propery/b_6_FinancialMeans";
import { parseLoanAndCreditBalance, parseReportingPeriodIncome } from "../../seedData/sections/c_income/c_1_Revenues";


type logFunc = (message: string, ...params: any[]) => void;

export function parseDetails(details: Declaration, logMessage: logFunc): DeclarationDefails {
    const result: DeclarationDefails = {
        generals: parseGeneral(details.content[0], logMessage),
        properties: parseProperty(details.content[1], logMessage),
        incomes: parseIncome(details.content[2], logMessage),
        interests: null,
        expenses: null
    }

    return result;
}

function parseGeneral(general: Content, logMessage: logFunc): A_GeneralSection {
    const grids = general.grids;

    const profileGrid = grids.find(grid => grid.category === DeclarationCategory.a_Profile);

    if (!profileGrid) {
        throw new Error("Profile grid not found");
    }

    const generalInfoTable = profileGrid.rows[0]?.cells[0]?.value as ValueClass;
    const profileInfo = parseDeclarationPersonInfo(generalInfoTable.rows);

    const familyTable = profileGrid.rows[1]?.cells[0]?.value as ValueClass | undefined;
    const familyMembers: a_2_DeclarantFamilyMember[] = familyTable?.rows ? parseDeclarantFamilyMemberRows(familyTable.rows) : [];

    const nonResidentTable = profileGrid.rows[2]?.cells[0]?.value as ValueClass | undefined
    const nonResidentRelatives: a_3_DeclarantNonResidentRelative[] = nonResidentTable?.rows ? parseDeclarantNonResidentRelativeRows(nonResidentTable.rows) : [];

    return {
        a_1_personInfo: profileInfo,
        a_2_familyMembers: familyMembers,
        a_3_nonResidentRelatives: nonResidentRelatives
    }
}

function parseProperty(property: Content, logMessage: logFunc): B_PropertySection {
    const grids = property.grids;

    // b_1
    const realEstateGrid = grids.find(grid => grid.category === DeclarationCategory.b_1_RealEstate);

    // b_1_1
    const realEstateTable = realEstateGrid?.rows[0]?.cells[0]?.value as ValueClass;
    const [b_1_1_realEstates, b_1_1_parsingIssues] = parseRealEstateRows(realEstateTable);

    if (b_1_1_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_1_1_parsingIssues ", b_1_1_parsingIssues);
    }

    // b_1_2
    const declarantRealEstateTable = realEstateGrid?.rows[1]?.cells[0]?.value as ValueClass;
    const [b_1_2_declarantRealEstates, b_1_2_declarantRealEstates_parsingIssues] = parseDeclarantRealEstateRows(declarantRealEstateTable);
    if (b_1_2_declarantRealEstates_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_1_2_declarantRealEstates_parsingIssues ", b_1_2_declarantRealEstates_parsingIssues);
    }

    // b_2
    const vehicleGrid = grids.find(grid => grid.category === DeclarationCategory.b_2_Vehicle);

    // b_2_1
    const vehicleTable = vehicleGrid?.rows[0]?.cells[0]?.value as ValueClass;
    const [b_2_1_transports, b_2_1_transports_parsingIssues] = parseTransportRows(vehicleTable);
    if (b_2_1_transports_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_2_1_transports_parsingIssues ", b_2_1_transports_parsingIssues);
    }

    // b_2_2
    const declarantVehicleTable = vehicleGrid?.rows[1]?.cells[0]?.value as ValueClass;
    const [b_2_2_declarantVehicles, b_2_2_declarantVehicles_parsingIssues] = parseDeclarantVehicles(declarantVehicleTable);
    if (b_2_2_declarantVehicles_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_2_2_declarantVehicles_parsingIssues ", b_2_2_declarantVehicles_parsingIssues);
    }

    // b_3
    const securitiesAndInvestmentsGrid = grids.find(grid => grid.category === DeclarationCategory.b_3_SecurityAndInvestment);

    // b_3_1
    const equitySecuritiesAndInvestmentsTable = securitiesAndInvestmentsGrid?.rows[0]?.cells[0]?.value as ValueClass;
    const [b_3_1_equitySecuritiesAndInvestments, b_3_1_parsingIssues] = parseEquitySecuritiesAndInvestmentsRows(equitySecuritiesAndInvestmentsTable);
    if (b_3_1_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_3_1_parsingIssues ", b_3_1_parsingIssues);
    }

    // b_3_2
    const declarantThirdPartyInvestmentsTable = securitiesAndInvestmentsGrid?.rows[1]?.cells[0]?.value as ValueClass;
    const [b_3_2_declarantThirdPartyInvestments, b_3_2_parsingIssues] = parseDeclarantThirdPartyInvestments(declarantThirdPartyInvestmentsTable);
    if (b_3_2_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_3_2_parsingIssues ", b_3_2_parsingIssues);
    }

    // b_3_3
    const declarantDebtSecuritiesTable = securitiesAndInvestmentsGrid?.rows[2]?.cells[0]?.value as ValueClass;
    const [b_3_3_declarantDebtSecurities, b_3_3_parsingIssues] = parseDeclarantDebtSecurities(declarantDebtSecuritiesTable);
    if (b_3_3_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_3_3_parsingIssues ", b_3_3_parsingIssues);
    }

    // b_3_4
    const declarantDebtSecuritiesThirdPartyTable = securitiesAndInvestmentsGrid?.rows[3]?.cells[0]?.value as ValueClass;
    const [b_3_4_declarantDebtSecuritiesThirdParty, b_3_4_parsingIssues] = parseDeclarantDebtSecuritiesThirdParty(declarantDebtSecuritiesThirdPartyTable);
    if (b_3_4_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_3_4_parsingIssues ", b_3_4_parsingIssues);
    }

    // b_4
    const loansAndDepositsGrid = grids.find(grid => grid.category === DeclarationCategory.b_4_LoansAndDeposits);

    // b_4_1
    const declarantLoanTable = loansAndDepositsGrid?.rows[0]?.cells[0]?.value as ValueClass;
    const [b_4_1_loans, b_4_1_parsingIssues] = parseDeclarantLoan(declarantLoanTable);
    if (b_4_1_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_4_1_parsingIssues ", b_4_1_parsingIssues);
    }

    // b_4_2
    const declarantThirdPartyLoanTable = loansAndDepositsGrid?.rows[1]?.cells[0]?.value as ValueClass;
    const [b_4_2_declarantThirdPartyLoans, b_4_2_parsingIssues] = parseDeclarantThirdPartyLoan(declarantThirdPartyLoanTable);
    if (b_4_2_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_4_2_parsingIssues ", b_4_2_parsingIssues);
    }

    // b_4_3
    const bankDepositTable = loansAndDepositsGrid?.rows[2]?.cells[0]?.value as ValueClass;
    const [b_4_3_bankDeposits, b_4_3_parsingIssues] = parseBankDeposits(bankDepositTable);
    if (b_4_3_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_4_3_parsingIssues ", b_4_3_parsingIssues);
    }

    // b_4_4
    const declarantThirdPartyDepositTable = loansAndDepositsGrid?.rows[3]?.cells[0]?.value as ValueClass;
    const [b_4_4_declarantThirdPartyDeposits, b_4_4_parsingIssues] = parseThirdPartyBankDeposits(declarantThirdPartyDepositTable);
    if (b_4_4_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_4_4_parsingIssues ", b_4_4_parsingIssues);
    }

    // b_5
    const expensivePropGrid = grids.find(grid => grid.category === DeclarationCategory.b_5_ExpensiveProperty);

    // b_5_1
    const valuablePropertyTable = expensivePropGrid?.rows[0]?.cells[0]?.value as ValueClass;
    const [b_5_1_valuableProperties, b_5_1_parsingIssues] = parseValuableProperties(valuablePropertyTable);
    if (b_5_1_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_5_1_parsingIssues ", b_5_1_parsingIssues);
    }

    // b_5_2
    const declarantValuablePropertyTable = expensivePropGrid?.rows[1]?.cells[0]?.value as ValueClass;
    const [b_5_2_declarantValuableProperties, b_5_2_parsingIssues] = parseDeclarantValuableProperties(declarantValuablePropertyTable);
    if (b_5_2_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_5_2_parsingIssues ", b_5_2_parsingIssues);
    }

    // b_6
    const financialMeansGrid = grids.find(grid => grid.category === DeclarationCategory.b_6_FinancialMeans);

    // b_6_1
    const bankAccountBalancesTable = financialMeansGrid?.rows[0]?.cells[0]?.value as ValueClass;
    const [b_6_1_bankAccountBalances, b_6_1_parsingIssues] = parseBankAccountBalances(bankAccountBalancesTable);
    if (b_6_1_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_6_1_parsingIssues ", b_6_1_parsingIssues);
    }

    // b_6_2
    const thirdPartyBankAccountBalancesTable = financialMeansGrid?.rows[1]?.cells[0]?.value as ValueClass;
    const [b_6_2_thirdPartyBankAccountBalances, b_6_2_parsingIssues] = parseThirdPartyBankAccountBalances(thirdPartyBankAccountBalancesTable);
    if (b_6_2_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_6_2_parsingIssues ", b_6_2_parsingIssues);
    }

    // b_6_3
    const electronicAccountCryptoTable = financialMeansGrid?.rows[2]?.cells[0]?.value as ValueClass;
    const [b_6_3_electronicAccountCrypto, b_6_3_parsingIssues] = parseElectronicAccountsAndCrypto(electronicAccountCryptoTable);
    if (b_6_3_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_6_3_parsingIssues ", b_6_3_parsingIssues);
    }

    // b_6_4
    const thirdPartyElectronicAccountCryptoTable = financialMeansGrid?.rows[3]?.cells[0]?.value as ValueClass;
    const [b_6_4_thirdPartyElectronicAccountCrypto, b_6_4_parsingIssues] = parseThirdPartyElectronicAccountsAndCrypto(thirdPartyElectronicAccountCryptoTable);
    if (b_6_4_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_6_4_parsingIssues ", b_6_4_parsingIssues);
    }

    // b_6_5
    const cashHoldingsTable = financialMeansGrid?.rows[4]?.cells[0]?.value as ValueClass;
    const [b_6_5_cashHoldings, b_6_5_parsingIssues] = parseCashHoldings(cashHoldingsTable);
    if (b_6_5_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_6_5_parsingIssues ", b_6_5_parsingIssues);
    }

    // b_6_6
    const cashHoldingsThirdPartyTable = financialMeansGrid?.rows[5]?.cells[0]?.value as ValueClass;
    const [b_6_6_cashHoldingsThirdParty, b_6_6_parsingIssues] = parseCashHoldingsThirdParty(cashHoldingsThirdPartyTable);
    if (b_6_6_parsingIssues.remainingHeaders.length > 0) {
        logMessage("b_6_6_parsingIssues ", b_6_6_parsingIssues);
    }

    return {
        b_1_realEstate: {
            b_1_1_realEstates,
            b_1_2_declarantRealEstates
        },
        b_2_vehicle: {
            b_2_1_transports,
            b_2_2_declarantVehicles
        },
        b_3_securities: {
            b_3_1_equitySecuritiesAndInvestments,
            b_3_2_declarantThirdPartyInvestments,
            b_3_3_declarantDebtSecurities,
            b_3_4_declarantDebtSecuritiesThirdParty
        },
        b_4_loansAndDeposits: {
            b_4_1_loans,
            b_4_2_declarantThirdPartyLoans,
            b_4_3_bankDeposits,
            b_4_4_declarantThirdPartyDeposits
        },
        b_5_expensiveProperty: {
            b_5_1_valuableProperties,
            b_5_2_declarantValuableProperties
        },
        b_6_financialMeans: {
            b_6_1_bankAccountBalances,
            b_6_2_thirdPartyBankAccountBalances,
            b_6_3_electronicAccountCrypto,
            b_6_4_thirdPartyElectronicAccountCrypto,
            b_6_5_cashHoldings,
            b_6_6_cashHoldingsThirdParty
        }
    }
}

function parseIncome(income: Content, logMessage: logFunc): C_IncomeSection {
    const grids = income.grids;

    // c_1
    const revenuesGrid = grids.find(grid => grid.category === DeclarationCategory.c_1_Revenues);

    // c_1_1
    const reportingPeriodIncomeTable = revenuesGrid?.rows[0]?.cells[0]?.value as ValueClass;
    const [c_1_1_reportingPeriodIncomes, c_1_1_reportingPeriodIncomesIssues] = parseReportingPeriodIncome(reportingPeriodIncomeTable);
    if (c_1_1_reportingPeriodIncomesIssues.remainingHeaders.length > 0) {
        logMessage("b_6_5_parsingIssues ", c_1_1_reportingPeriodIncomesIssues);
    }

    // c_1_2
    const loanAndCreditBalanceTable = revenuesGrid?.rows[1]?.cells[0]?.value as ValueClass;
    const [c_1_2_loanAndCreditBalances, c_1_2_loanAndCreditBalancesIssues] = parseLoanAndCreditBalance(loanAndCreditBalanceTable);
    if (c_1_2_loanAndCreditBalancesIssues.remainingHeaders.length > 0) {
        logMessage("c_1_2_loanAndCreditBalancesIssues ", c_1_2_loanAndCreditBalancesIssues);
    }
    // c_2
    const incomeAdditionalInformationGrid = grids.find(grid => grid.category === DeclarationCategory.c_2_IncomeAdditionalInformation);
    const c_2_incomeAdditionalInformationJson = JSON.stringify(incomeAdditionalInformationGrid?.rows);

    return {
        c_1_revenues: {
            c_1_1_reportingPeriodIncomes,
            c_1_2_loanAndCreditBalances
        },
        c_2_incomeAdditionalInformationJson
    }
}


export interface DeclarationDefails {
    generals: A_GeneralSection;
    properties: B_PropertySection;
    incomes: C_IncomeSection;
    interests: D_InterestsSection | null;
    expenses: E_ExpenseSection | null;
}
