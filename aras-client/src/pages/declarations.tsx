import { Link as RouterLink } from "react-router";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Box,
  Button,
  Card,
  CardContent,
  Input,
  InputProps,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/joy";
import { Layout } from "../components/layout";
import { ArasTable } from "../components/table";
import { ArasSelect } from "../components/select";
import { formatCurrency } from "../utils";
import { HOME, DECLARATIONS } from "../breadcrumbs";
import { useQuery } from "react-query";
import { useMemo, useState } from "react";
import debounce from "debounce";

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
  {
    id: "11",
    name: "John Doe",
    position: "Mayor",
    declarationDate: "2023",
    risk: 1,
    income: 98000,
  },
  {
    id: "12",
    name: "Jane Smith",
    position: "Council Member",
    declarationDate: "2024",
    risk: 0.78,
    income: 88000,
  },
  {
    id: "13",
    name: "Alice Johnson",
    position: "Treasurer",
    declarationDate: "2023",
    risk: 0.56,
    income: 93000,
  },
  {
    id: "14",
    name: "Bob Brown",
    position: "Secretary",
    declarationDate: "2024",
    risk: 0.32,
    income: 83000,
  },
  {
    id: "15",
    name: "Charlie Davis",
    position: "Chief of Staff",
    declarationDate: "2023",
    risk: 0.25,
    income: 91000,
  },
  {
    id: "16",
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
    cell: (income) => formatCurrency(income.getValue()),
  }),
];

const SearchInput = (props: InputProps) => {
  return <Input {...props} placeholder="Search..." />;
};

const defaultDepartment = 'All departments';
const departmentOptions = [
  'All departments',
  "Finance",
  "Human Resources",
  "Legal",
  "Public Works",
  "Parks and Recreation",
];

const defaultYear = 'All years';
const yearOptions = ['All years', "2021", "2022", "2023", "2024"];

const defaultQuery = '';
const defaultData: Declaration[] = [];

interface FilterProps {
  onFiltersChange: (year: string, department: string, query: string) => void;
}

export const Filters = ({ onFiltersChange }: FilterProps) => {
  const [year, setYear] = useState<string>(defaultYear);
  const [department, setDepartment] = useState<string>(defaultDepartment);
  const [query, setQuery] = useState(defaultQuery);

  const handleFiltersChange = useMemo(() => {
    return debounce((year: string, department: string, query: string) => {
      onFiltersChange(year, department, query);
    }, 400);
  }, [onFiltersChange])

  return <Box mt={2} display="flex" gap={1} alignItems="end" flexWrap="wrap">
    <Box flex="1 0 250px">
      <SearchInput onChange={(e) => {
        const q = e.target.value || defaultQuery;
        setQuery(q);
        handleFiltersChange(year, department, q);
      }}/>
    </Box>
    <Box flex="0 0 200px">
      <ArasSelect 
        label="Declaration year" 
        options={yearOptions} 
        onChange={(_e, v) => {
          const y = v || defaultYear;
          setYear(y);
          handleFiltersChange(y, department, query);
        }}/>
    </Box>
    <Box flex="0 0 200px">
      <ArasSelect 
        label="Department" 
        options={departmentOptions}  
        onChange={(_e, v) => {
          const d = v || defaultDepartment;
          setDepartment(d)
          handleFiltersChange(year, d, query);
      }}/>
    </Box>
  </Box>
}

export const DeclarationsPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({ year: defaultYear, department: defaultDepartment, query: defaultQuery });
  
  const declarations = useQuery({
    queryKey: ["declarations", { filters, pageSize, page }],
    queryFn: async () => {
      console.log('fetching data', page, pageSize, filters );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return data;
    },
  });

  const table = useReactTable({
    columns,
    data: declarations.data ?? defaultData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  return (
    <Layout title="Declarations" breadcrumbs={[HOME, DECLARATIONS]}>
      <Card sx={{ maxWidth: "300px" }}>
        <Typography level="title-md">Summary</Typography>
        <CardContent orientation="vertical">
          <List marker="disc">
            <ListItem>Number of records: 6</ListItem>
            <ListItem>Number of errors: 11</ListItem>
            <ListItem>Number of risk indicators: 23</ListItem>
          </List>
        </CardContent>
      </Card>
      <Filters onFiltersChange={(year, department, query) => {
        setFilters({ year, department, query });
        setPage(1);
      }}/>
      <Card sx={{ p: 0, gap: 0 }}>
        <ArasTable 
          onNextPage={() => setPage(page + 1)}
          onPrevPage={() => setPage(page - 1)}
          onPageSizeChange={(size) => { 
            setPageSize(size);
            setPage(1);
          }}
          hasNext={true}
          hasPrev={true}
          table={table}
          manualPagination={true}
          isLoading={declarations.isLoading} 
        />
      </Card>
    </Layout>
  );
};
