import { Table } from "@mui/joy";
import { flexRender, Table as TableType } from "@tanstack/react-table";

export interface Record {
    risk?: number;
}

interface TableProps<T extends Record> {
    table: TableType<T>;
}

export const getRiskClass = (risk?: number): string | undefined => {
    if (!risk || risk < 0 || risk > 1) {
        return;
    }
    
    const riskType = Math.round(risk * 4);
    if (riskType == 0) {
        return undefined
    }

    return `danger-${riskType}`;
};

export const ArasTable = <T extends Record,>({table}: TableProps<T>) => {
    return <Table
        borderAxis="xBetween"
        color="neutral"
    >
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
                <th key={header.id}>
                {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )}
                </th>
            ))}
            </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map(row => (
            <tr key={row.id} className={getRiskClass(row.original.risk)}>
            {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            ))}
            </tr>
        ))}
        </tbody>
    </Table>
}