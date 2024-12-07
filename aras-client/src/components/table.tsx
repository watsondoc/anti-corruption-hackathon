import { Table } from "@mui/joy";
import { flexRender, Table as TableType } from "@tanstack/react-table";

interface TableProps<T> {
    table: TableType<T>;
}

export const ArasTable = <T,>({table}: TableProps<T>) => {
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
            <tr key={row.id}>
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