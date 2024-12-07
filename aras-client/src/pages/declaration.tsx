import React from "react";
import { Layout } from "../components/layout";
import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/joy";
import { ArasTable, Record } from "../components/table";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { formatCurrency } from "../utils";

interface Asset extends Record{
  risk?: number;
  type: string;
  value: string;
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

const publicOfficial = {
  name: "John Doe",
  risk: 0.87,
  position: "Mayor",
  income: '100000',
  assets: [
    { type: "Real Estate", value: '500000' },
    { type: "Vehicle", value: '30000' },
  ] as Asset[],
  riskIndicators: [
    "High income to asset ratio",
    "Unexplained wealth",
    "High risk industry",
    "High risk jurisdiction",
  ],
};

export const DeclarationPage: React.FC = () => {
  const table = useReactTable({
    columns,
    data: publicOfficial.assets,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Layout title="John Doe">
      <Box display="flex" gap={2} flexWrap="wrap">
        <Card sx={{ flex: "1 1", minWidth: 250 }}>
          <Typography level="title-md">General Info</Typography>
          <CardContent>
            <List marker="disc">
              <ListItem>Full Name: {publicOfficial.name}</ListItem>
              <ListItem>Position: {publicOfficial.position}</ListItem>
              <ListItem>Income: {formatCurrency(publicOfficial.income)}</ListItem>
            </List>
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ flex: "2 1", minWidth: 300 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography level="title-md">Risk indicators:</Typography>
            <Typography level="title-md">
              Risk Rating:
              <Typography ml={1} level="title-md" color="danger" component="span">
                {publicOfficial.risk}
              </Typography>
            </Typography>
          </Box>
          <CardContent>
            <List marker="disc">
              {publicOfficial.riskIndicators.map((indicator, index) => (
                <ListItem key={index}>{indicator}</ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
      <Card sx={{ p: 0 }}>
        <Typography pt={2} px={2} level="title-lg">Assets</Typography>
        <ArasTable table={table} />
      </Card>
    </Layout>
  );
};
