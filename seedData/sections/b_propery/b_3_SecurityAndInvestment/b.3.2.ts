import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";

export interface b_3_2_DeclarantThirdPartyInvestments {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
    companyName: string; // "Ընկերության լրիվ անվանումը"
    investmentType: string; // "Արժեթղթի կամ այլ ներդրման տեսակը"
    currentValue: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա բաժնային արժեթղթի կամ այլ ներդրման արժեքը(գինը) և արժույթը"
    ownershipPercentage: string; // "Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա բաժնային արժեթղթի կամ այլ ներդրման բաժնեմասնակցության %"
    ownerInfo: string; // "Բաժնային արժեթղթերի և այլ ներդրումների սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
    relationshipNature: string; // "Հայտարարատուի և սեփականատիրոջ միջև առկա կապի բնույթը"
}

export const parseDeclarantThirdPartyInvestments = (
    vc: ValueClass
): FillRowsResult<b_3_2_DeclarantThirdPartyInvestments> => {

    const names = {
        numbering: ["NN ը/կ"],
        declarantName: ["Հայտարարատուի անունը, ազգանունը, հայրանունը"],
        companyName: ["Ընկերության լրիվ անվանումը"],
        investmentType: ["Արժեթղթի կամ այլ ներդրման տեսակը"],
        currentValue: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա բաժնային արժեթղթի կամ այլ ներդրման արժեքը(գինը) և արժույթը"],
        ownershipPercentage: ["Պաշտոնի ստանձնման կամ դադարեցման օրվա դրությամբ առկա բաժնային արժեթղթի կամ այլ ներդրման բաժնեմասնակցության %"],
        ownerInfo: ["Բաժնային արժեթղթերի և այլ ներդրումների սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"],
        relationshipNature: ["Հայտարարատուի և սեփականատիրոջ միջև առկա կապի բնույթը"]
    }

    return fillRows(names, vc);
};
