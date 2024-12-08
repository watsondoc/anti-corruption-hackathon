// Имущество (драгоценное имущество) стоимостью более четырех миллионов драмов или эквивалента в иностранной валюте, фактически находящееся в распоряжении декларанта в течение более 90 дней в течение отчетного периода, или приобретенное от имени, в пользу или за счет декларанта, драгоценное имущество, принадлежащее третьему лицу на праве собственности, или драгоценное имущество, от которого он получает фактическую выгоду, или этим имуществом распоряжается декларант
import { fillRows, FillRowsResult } from "../../../../seedData/sections/tools/RowsSearcher";
import { ValueClass } from "../../../../src/parser/originalInterfaces";

export interface b_5_2_DeclarantValuableProperty {
    numbering: number | null; // "NN ը/կ"
    declarantName: string; // "Հայտարարատուի անունը, ազգանունը, հայրանունը"
    propertyType: string; // "Թանկարժեք գույքի տեսակը"
    description: string; // "Թանկարժեք գույքի նկարագրությունը"
    valueAndCurrency: string; // "Գինը(արժեքը) և արժույթը"
    ownerName: string; // "Գույքի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"
    relationship: string; // "Հայտարարատուի և սեփականատիրոջ միջև առկա կապի բնույթը"
}

export const parseDeclarantValuableProperties = (
    vc: ValueClass
): FillRowsResult<b_5_2_DeclarantValuableProperty> => {
    const names = {
        numbering: ["NN ը/կ"],
        declarantName: ["Հայտարարատուի անունը, ազգանունը, հայրանունը"],
        propertyType: ["Թանկարժեք գույքի տեսակը"],
        description: ["Թանկարժեք գույքի նկարագրությունը"],
        valueAndCurrency: ["Գինը(արժեքը) և արժույթը"],
        ownerName: ["Գույքի սեփականատիրոջ անվանումը կամ անունը, ազգանունը, հայրանունը"],
        relationship: ["Հայտարարատուի և սեփականատիրոջ միջև առկա կապի բնույթը"],
    }

    return fillRows(names, vc);
};
