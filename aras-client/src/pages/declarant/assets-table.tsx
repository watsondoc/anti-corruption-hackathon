import { Card, Typography } from "@mui/joy";
import { useReactTable, getCoreRowModel, createColumnHelper } from "@tanstack/react-table";
import { ArasTable } from "../../components/table";
import { Asset } from "./type";
import { formatCurrency } from "../../utils";

interface AssetsTableProps {
    assets: Asset[];
}

const columnHelper = createColumnHelper<Asset>();

const columns = [
  columnHelper.accessor("type", {
    header: "Type",
    cell: (risk) => risk.getValue(),
  }),
  columnHelper.accessor("value", {
    header: "Value",
    cell: (value) => formatCurrency(value.getValue()),
  }),
];

export const AssetsTable = ({ assets }: AssetsTableProps) => {
    const table = useReactTable({
      columns,
      data: assets,
      getCoreRowModel: getCoreRowModel(),
    });
  
    return <Card sx={{ p: 0 }}>
      <Typography pt={2} px={2} level="title-lg" >Assets</Typography>
      <ArasTable table={table} paginationType="off" />
    </Card>
  };