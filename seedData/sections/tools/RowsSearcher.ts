import { ValueClass } from "../../../src/parser/originalInterfaces";


export type FillRowsResult<T> = [T[], ParsingIssues];

export type TargetToRealColumnNames = {
    [key: string]: string[];
}

export type ParsingIssues = {
    incorrectHeaderAssumptions: { [prop: string]: string[] };
    remainingHeaders: string[];
}

export function fillRows<T>(targetToRealColumnNames: TargetToRealColumnNames, vc: ValueClass): FillRowsResult<T> {

    const parsingIssues: ParsingIssues = {
        incorrectHeaderAssumptions: {},
        remainingHeaders: []
    }

    if (vc.rows.length === 0) {
        return [[], parsingIssues];
    }

    const rowColumnIndexByHeader = new Map<string, number>();
    {
        let columnIndex = 0;
        for (const h of vc.headerItems) {
            rowColumnIndexByHeader.set(h.name, columnIndex);
            columnIndex++;
        }
    }

    const resultRows: T[] = [];
    const correctHeaders: string[][] = []
    const remainingHeaders = new Set<string>();

    let rowIndex = 0;
    while (rowIndex < vc.rows.length) {
        const resultRow: any = {};

        for (const targetColumn in targetToRealColumnNames) {
            const assumptionColumnNames = targetToRealColumnNames[targetColumn];

            let value = "";
            for (const assumptionColumnName of assumptionColumnNames) {
                const columnIndex = rowColumnIndexByHeader.get(assumptionColumnName);
                if (columnIndex !== undefined) {
                    value = vc.rows[rowIndex][columnIndex];
                    correctHeaders.push(assumptionColumnNames);
                    break;
                }
                else {
                    (() => { })();
                }
            }

            if (!value) {
                if (!parsingIssues.incorrectHeaderAssumptions[targetColumn]) {
                    parsingIssues.incorrectHeaderAssumptions[targetColumn] = [];
                    parsingIssues.incorrectHeaderAssumptions[targetColumn].push(...assumptionColumnNames);
                }
            }

            resultRow[targetColumn] = value;
        }

        if (Object.keys(parsingIssues.incorrectHeaderAssumptions).length > 0) {
            for (const h of vc.headerItems) {
                if (!correctHeaders.some(x => x.includes(h.name))) {
                    remainingHeaders.add(h.name);
                }
            }
        }

        parsingIssues.remainingHeaders = Array.from(remainingHeaders);

        resultRows.push(resultRow);
        rowIndex++;
    }

    return [resultRows, parsingIssues];
}
