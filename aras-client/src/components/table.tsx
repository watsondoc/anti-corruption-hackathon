import { useMemo } from "react";
import { Box, CircularProgress, Divider, IconButton, Table } from "@mui/joy";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { getRiskClass } from "../utils";
import { ArasSelect } from "./select";

export interface Record {
  risk?: number;
}

interface TableProps<T extends Record> {
  table: TableType<T>;
  manualPagination?: boolean;
  isLoading?: boolean;
  hasNext?: boolean;
  hasPrev?: boolean;
  onPageSizeChange?: (pageSize: number) => void;
  onNextPage?: () => void;
  onPrevPage?: () => void;
}

interface PaginationProps {
  pageOptions: number[];
  onPageSizeChange: (pageSize: number) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  disabled?: boolean;
}

export const Pagination = ({
  onPageSizeChange,
  onNextPage,
  onPrevPage,
  hasNext,
  hasPrev,
  pageOptions,
  disabled,
}: PaginationProps) => {
  const options = useMemo(
    () => pageOptions.map((x) => x.toString()),
    [pageOptions]
  );

  return (
    <Box display="flex" gap={1} justifyContent="space-between">
      <Box
        display="flex"
        alignContent="center"
        gap={1}
        sx={{ verticalAlign: "middle" }}
      >
        <ArasSelect
          size="sm"
          label="Page size"
          options={options}
          onChange={(_e, v) => onPageSizeChange((v && parseInt(v)) || 5)}
          disabled={disabled}
        />
      </Box>
      <Box>
        <IconButton disabled={disabled || !hasPrev} onClick={onPrevPage}>
          <FaAngleLeft />
        </IconButton>
        <IconButton disabled={disabled || !hasNext} onClick={onNextPage}>
          <FaAngleRight />
        </IconButton>
      </Box>
    </Box>
  );
};

const PAGE_SIZES = [10, 20, 30, 40, 50];

export const ArasTable = <T extends Record>({
  table,
  isLoading,
  manualPagination = false,
  ...props
}: TableProps<T>) => {
  return (
    <>
      <Box overflow="scroll">
        <Table borderAxis="xBetween" color="neutral">
          <thead style={{ overflow: "scroll" }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="cell" {...{ width: 200 }}>
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
            {isLoading && (
              <tr>
                <td>
                  <CircularProgress />
                </td>
              </tr>
            )}
            {!isLoading && table.getRowCount() === 0 && (
              <tr>
                <td>No records found</td>
              </tr>
            )}
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={getRiskClass(row.original.risk)}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="cell">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
      <Divider sx={{ pt: 0 }} />
      {!manualPagination && (
        <Box py={1} px={2}>
          <Pagination
            pageOptions={PAGE_SIZES}
            onPageSizeChange={(pageSize: number) => {
              table.setPageSize(pageSize);
            }}
            hasNext={table.getCanNextPage()}
            hasPrev={table.getCanPreviousPage()}
            onNextPage={() => table.nextPage()}
            onPrevPage={() => table.previousPage()}
          />
        </Box>
      )}
      {manualPagination && (
        <Box py={1} px={2}>
          <Pagination
            pageOptions={PAGE_SIZES}
            onPageSizeChange={(pageSize: number) => {
              props.onPageSizeChange?.(pageSize);
            }}
            hasNext={props.hasNext || false}
            hasPrev={props.hasPrev || false}
            onNextPage={() => props.onNextPage?.()}
            onPrevPage={() => props.onPrevPage?.()}
          />
        </Box>
      )}
    </>
  );
};
