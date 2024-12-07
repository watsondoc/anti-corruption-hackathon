import { Link as RouterLink } from "react-router";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Box,
  Card,
  CardContent,
  Input,
  InputProps,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/joy";
import { Layout } from "../components/layout";
import { ArasTable } from "../components/table";
import { ArasSelect } from "../components/select";
import { formatCurrency } from "../utils";
import { HOME, DECLARATIONS } from "../breadcrumbs";
import { useQuery } from "react-query";
import { useEffect, useMemo, useState } from "react";
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
    header: "Risk Rating",
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

const defaultInstitution = "All";
const institutionOptions = [
  defaultInstitution,
  "ՀՀ Նախագահ",
  "Գործադիր իշխանություն",
  "Օրենսդիր իշխանություն",
  "Դատական իշխանություն",
  "Տեղական ինքնակառավարման մարմիններ",
  "Ինքնավար և անկախ մարմիններ",
  "Այլ",
];

const defaultDeclarantType = "All";
const declarantTypeOptions = [
  defaultDeclarantType,
  "Ընտանիքի անդամ",
  "Պաշտոնատար անձ",
];

const defaultDeclarationType = "All";
const declarationTypeOptions = [
  defaultDeclarationType,
  "Ստանձնելու",
  "Դադարեցնելու",
];

const defaultYear = "2024";
const yearOptions = ["2021", "2022", "2023", "2024"];
yearOptions.reverse();

const defaultQuery = "";
const defaultData: Declaration[] = [];

interface FilterProps {
  onFiltersChange: (
    query: string, 
    year: string, 
    declarationType: string,
    declarantType: string,
    institutionType: string
  ) => void;
}

export const Filters = ({ onFiltersChange }: FilterProps) => {
  const [query, setQuery] = useState(defaultQuery);
  const [year, setYear] = useState<string>(defaultYear);
  const [declarantType, setDeclarantType] = useState(defaultDeclarantType);
  const [declarationType, setDeclarationType] = useState(
    defaultDeclarationType
  );
  const [institutionType, setInstitutionType] =
    useState<string>(defaultInstitution);

  const handleFiltersChange = useMemo(
    () =>
      debounce((
        query: string, 
        year: string, 
        declarationType: string,
        declarantType: string,
        institutionType: string,
      ) => {
        onFiltersChange(query, year, declarationType, declarantType, institutionType);
      }),
    [onFiltersChange]
  );

  useEffect(() => {
    handleFiltersChange(query, year, declarationType, declarantType, institutionType);
  }, [query, year, declarationType, declarantType, institutionType, onFiltersChange]);

  return (
    <Stack mt={2} direction="column" gap={2}>
      <Stack gap={1} alignItems="end" direction="row">
        <Box flex="1 1">
          <SearchInput
            onChange={(e) => {
              const q = e.target.value || defaultQuery;
              setQuery(q);
            }}
          />
        </Box>
        <Box flex="0 1 120px">
          <ArasSelect
            label="Declaration year"
            options={yearOptions}
            onChange={(_e, v) => {
              const y = v || defaultYear;
              setYear(y);
            }}
          />
        </Box>
      </Stack>
      <Stack gap={1} alignItems="end" direction="row">
        <Box flex="1 1 200px">
          <ArasSelect
            label="Declaration Type"
            options={declarationTypeOptions}
            onChange={(_e, v) => {
              const d = v || defaultDeclarationType;
              setDeclarationType(d);
            }}
          />
        </Box>
        <Box flex="1 1 200px">
          <ArasSelect
            label="Declarant Type"
            options={declarantTypeOptions}
            onChange={(_e, v) => {
              const d = v || defaultDeclarantType;
              setDeclarantType(d);
            }}
          />
        </Box>

        <Box flex="1 1 200px">
          <ArasSelect
            label="Institution Group"
            options={institutionOptions}
            onChange={(_e, v) => {
              const d = v || defaultInstitution;
              setInstitutionType(d);
            }}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export const DeclarationsPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    query: defaultQuery,
    year: defaultYear,
    declarationType: defaultDeclarationType,
    declarantType: defaultDeclarantType,
    institution: defaultInstitution,
  });

  const declarations = useQuery({
    queryKey: ["declarations", { filters, pageSize, page }],
    queryFn: async () => {
      console.log("fetching data", page, pageSize, filters);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { data, total: data.length };
    },
  });

  const table = useReactTable({
    columns,
    data: declarations.data?.data ?? defaultData,
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
      <Filters
        onFiltersChange={(query, year, declarationType, declarantType, institution ) => {
          setFilters({ query, year, declarationType, declarantType, institution });
          setPage(1);
        }}
      />
      <Card sx={{ p: 0, gap: 0 }}>
        <ArasTable
          table={table}
          onNextPage={() => setPage(page + 1)}
          onPrevPage={() => setPage(page - 1)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
          paginationType="manual"
          hasNext={true}
          hasPrev={true}
          pageSize={pageSize}
          currentPage={page}
          isLoading={declarations.isLoading}
          totalItems={declarations.data?.total}
        />
      </Card>
    </Layout>
  );
};
