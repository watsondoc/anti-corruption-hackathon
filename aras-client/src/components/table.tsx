import { useMemo } from "react";
import { Box, CircularProgress, Divider, IconButton, Table, Typography } from "@mui/joy";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { getRiskClass } from "../utils";
import { ArasSelect } from "./select";

export interface Row {
  riskRating?: number;
}

interface TableProps<T extends Row> {
  table: TableType<T>;
  paginationType?: 'manual' | 'auto' | 'off';
  isLoading?: boolean;
  hasNext?: boolean;
  hasPrev?: boolean;
  onPageSizeChange?: (pageSize: number) => void;
  onNextPage?: () => void;
  onPrevPage?: () => void;

  currentPage?: number;
  totalItems?: number;
  pageSize?: number;
}

interface PaginationProps {
  pageOptions: number[];
  onPageSizeChange: (pageSize: number) => void;
  
  onNextPage: () => void;
  onPrevPage: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  disabled?: boolean;

  currentPage: number;
  totalItems: number;
  pageSize: number;
}

export const Pagination = ({
  onPageSizeChange,
  onNextPage,
  onPrevPage,
  hasNext,
  hasPrev,
  pageOptions,
  disabled,
  currentPage,
  totalItems,
  pageSize
}: PaginationProps) => {
  const options = useMemo(
    () => pageOptions.map((x) => x.toString()),
    [pageOptions]
  );

  const page = Math.max(currentPage - 1, 0);
  const firstItem = page * pageSize;
  const lastItem = Math.min(page * pageSize + pageSize, totalItems);

  return (
    <Box display="flex" gap={1} justifyContent="space-between">
      <Box
        display="flex"
        alignContent="center"
        gap={1}
        sx={{ verticalAlign: "middle" }}
      >
        {options.length > 0 && <ArasSelect
          size="sm"
          label="Page size"
          options={options}
          value={pageSize.toString()}
          onChange={(_e, v) => onPageSizeChange((v && parseInt(v)) || 5)}
          disabled={disabled}
        />}
      </Box>
      <Box display='flex' gap={1} alignItems='center'>
        <Typography level='body-xs'>Items {firstItem}-{lastItem} out of {totalItems}</Typography>
        <Box>
          <IconButton disabled={disabled || !hasPrev} onClick={onPrevPage}>
            <FaAngleLeft />
          </IconButton>
          <IconButton disabled={disabled || !hasNext} onClick={onNextPage}>
            <FaAngleRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

const PAGE_SIZES = [10, 20, 30, 40, 50];

export const ArasTable = <T extends Row>({
  table,
  isLoading,
  paginationType = 'auto',
  pageSize,
  totalItems,
  currentPage,
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
                  <th key={header.id} className="cell" {...{ width: header.getSize() || 200 }}>
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
              <tr key={row.id} className={getRiskClass(row.original.riskRating)}>
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
      {paginationType !== 'off' && <Divider sx={{ pt: 0 }} />}
      {paginationType === 'auto' && (
        <Box py={1} px={2}>
          <Pagination
            pageOptions={[]}
            onPageSizeChange={() => {}}
            hasNext={table.getCanNextPage()}
            hasPrev={table.getCanPreviousPage()}
            onNextPage={() => table.nextPage()}
            onPrevPage={() => table.previousPage()}
            totalItems={table.getRowCount()}
            currentPage={currentPage ?? 1}
            pageSize={10}
          />
        </Box>
      )}
      {paginationType === 'manual' && (
        <Box py={1} px={2}>
          <Pagination
            pageOptions={PAGE_SIZES}
            onPageSizeChange={(pageSize: number) => {
              table.setPageSize(pageSize);
              props.onPageSizeChange?.(pageSize);
            }}
            hasNext={props.hasNext || false}
            hasPrev={props.hasPrev || false}
            onNextPage={() => props.onNextPage?.()}
            onPrevPage={() => props.onPrevPage?.()}
            totalItems={totalItems ?? 0}
            currentPage={currentPage ?? 1}
            pageSize={pageSize ?? 10}
          />
        </Box>
      )}
    </>
  );
};
