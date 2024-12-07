import { Link as RouterLink } from "react-router";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Box, Card, CardContent, Input, Link, List, ListItem, Sheet, Typography } from "@mui/joy";
import { Layout } from "../components/layout";
import { ArasTable } from "../components/table";
import { ArasSelect } from "../components/select";
import { formatCurrency } from "../utils";

interface Declaration {
  id: string;
  name: string;
  position: string;
  declarationDate: string;
  risk: number;
  income: number;
}

const data: Declaration[] = [
  {
    id: "1",
    name: "John Doe",
    position: "Mayor",
    declarationDate: "2023",
    risk: 1,
    income: 98000,
  },
  {
    id: "2",
    name: "Jane Smith",
    position: "Council Member",
    declarationDate: "2024",
    risk: 0.78,
    income: 88000,
  },
  {
    id: "3",
    name: "Alice Johnson",
    position: "Treasurer",
    declarationDate: "2023",
    risk: 0.56,
    income: 93000,
  },
  {
    id: "4",
    name: "Bob Brown",
    position: "Secretary",
    declarationDate: "2024",
    risk: 0.32,
    income: 83000,
  },
  {
    id: "5",
    name: "Charlie Davis",
    position: "Chief of Staff",
    declarationDate: "2023",
    risk: 0.25,
    income: 91000,
  },
  {
    id: "6",
    name: "David Wilson",
    position: "Deputy Mayor",
    declarationDate: "2023",
    risk: 0.01,
    income: 95000,
  },
];

const columnHelper = createColumnHelper<Declaration>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: ({ cell, row }) => {
      return (
        <Link component={RouterLink} to={`/declarations/${row.original.id}`}>
          {cell.getValue()}
        </Link>
      );
    },
  }),
  columnHelper.accessor("position", {
    header: "Position",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("declarationDate", {
    header: "Declaration year",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("risk", {
    header: "Risk",
    cell: (risk) => risk.getValue(),
  }),
  columnHelper.accessor("income", {
    header: "Income",
    cell: (income) => formatCurrency(income.getValue())
  }),
];

const SearchInput = () => {
  return <Input placeholder="Search..." />;
};


const departmentOptions = [
  "Finance",
  "Human Resources",
  "Legal",
  "Public Works",
  "Parks and Recreation",
];
const yearOptions = ["2021", "2022", "2023", "2024"];

export const DeclarationsPage = () => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Layout title="Declarations">
      <Card sx={{ maxWidth: '300px' }}>
        <Typography level="title-md">Summary</Typography>
        <CardContent orientation="vertical">
          <List marker="disc">
            <ListItem>Number of records: 6</ListItem>
            <ListItem>Number of errors: 11</ListItem>
            <ListItem>Number of risk indicators: 23</ListItem>
          </List>
        </CardContent>
      </Card>
      <Box mt={2} display="flex" gap={1} alignItems="end" flexWrap='wrap'>
        <Box flex="1 0 250px">
          <SearchInput />
        </Box>
        <Box flex="0 0 200px">
          <ArasSelect label="Declaration year" options={yearOptions} />
        </Box>
        <Box flex="0 0 200px">
          <ArasSelect label="Department" options={departmentOptions} />
        </Box>
      </Box>
      <Card sx={{ p: 0 }}>
        <ArasTable table={table} />
      </Card>
    </Layout>
  );
};
