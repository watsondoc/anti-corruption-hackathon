import { useMemo } from "react";
import { Box, IconButton, Table } from "@mui/joy";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { getRiskClass } from "../utils";
import { ArasSelect } from "./select";

export interface Record {
    risk?: number;
}

interface TableProps<T extends Record> {
    table: TableType<T>;
}

interface PaginationProps {
    pageOptions: number[];
    onPageSizeChange: (pageSize: number) => void;
    onNextPage: () => void;
    onPrevPage: () => void;
    hasNext: boolean;
    hasPrev: boolean;
}

export const Pagination = ({ 
    onPageSizeChange, 
    onNextPage, 
    onPrevPage,
    hasNext,
    hasPrev,
    pageOptions,
}: PaginationProps) => {
    const options = useMemo(() => pageOptions.map((x) => x.toString()), [pageOptions]);

    return <Box display='flex' gap={1} justifyContent='space-between' width='100%'>
        <Box display='flex' alignContent='center' gap={1} sx={{ verticalAlign: 'middle' }}>
            <ArasSelect size='sm' label='Page size' options={options} onChange={(_e, v) => onPageSizeChange((v && parseInt(v)) || 5)}/> 
        </Box>
        <Box>
            <IconButton disabled={!hasPrev} onClick={onPrevPage}><FaAngleLeft /></IconButton>
            <IconButton disabled={!hasNext} onClick={onNextPage}><FaAngleRight /></IconButton>
       </Box>
    </Box>
}

const PAGE_SIZES = [10, 20, 30, 40, 50];

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
        <tfoot style={{ width: '100%' }}>
            <tr>
                <td colSpan={table.getAllColumns().length}>
                    <Pagination 
                        pageOptions={PAGE_SIZES}
                        onPageSizeChange={(pageSize: number) => { table.setPageSize(pageSize) }}
                        hasNext={table.getCanNextPage()}
                        hasPrev={table.getCanPreviousPage()}
                        onNextPage={() => table.nextPage()}
                        onPrevPage={() => table.previousPage()}
                    />
                </td>
            </tr>
        </tfoot>
    </Table>
}