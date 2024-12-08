import { Card, Typography } from "@mui/joy";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { ArasTable, Row } from "../../components/table";
import { formatCurrency } from "../../utils";
import { Declaration } from "../declarations";
import { useMemo } from "react";

interface IncomeTableProps {
  income: Declaration["incomeAgg"];
}

type FlatIncomeType = { type: string; amount: string } & Row;

const columnHelper = createColumnHelper<FlatIncomeType>();

const columns = [
  columnHelper.accessor("type", {
    header: "Type",
    cell: (type) => type.getValue(),
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (amount) => formatCurrency(amount.getValue()),
  }),
];

export const IncomeTable = ({ income }: IncomeTableProps) => {
  const incomeArray = useMemo(
    () =>
      Object.entries(income).map(
        ([type, amount]): FlatIncomeType => ({
          type,
          amount: formatCurrency(amount as any),
        })
      ),
    [income]
  );

  const table = useReactTable({
    columns,
    data: incomeArray,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card sx={{ p: 0 }}>
      <Typography pt={2} px={2} level="title-lg">
        Income
      </Typography>
      <ArasTable table={table} paginationType="off"/>
    </Card>
  );
};
