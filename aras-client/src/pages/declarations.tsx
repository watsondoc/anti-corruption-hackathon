import { Link as RouterLink } from 'react-router'
import {
    createColumnHelper,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Link, Sheet } from '@mui/joy';
import { Layout } from '../components/layout';
import { ArasTable } from '../components/table';


interface Declaration {
    id: string;
    name: string;
    position: string;
    declarationDate: string;
    risk: number;
}


const data: Declaration[] = [
    { 
        id: '1', 
        name: 'John Doe', 
        position: 'Mayor', 
        declarationDate: '2023-01-15',
        risk: 0.87,
    },
    { 
        id: '2', 
        name: 'Jane Smith', 
        position: 'Council Member', 
        declarationDate: '2023-02-10',
        risk: 0.56,
    },
    { 
        id: '3', 
        name: 'Alice Johnson', 
        position: 'Treasurer', 
        declarationDate: '2023-03-05',
        risk: 0.45,
    },
    { 
        id: '4', 
        name: 'Bob Brown', 
        position: 'Secretary', 
        declarationDate: '2023-04-12',
        risk: 0.32,
    },
    { 
        id: '5', 
        name: 'Charlie Davis', 
        position: 'Chief of Staff', 
        declarationDate: '2023-05-20',
        risk: 0.1,
    },
];

const columnHelper = createColumnHelper<Declaration>()

const columns = [
    columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ cell, row }) => {
            return <Link component={RouterLink} to={`/declarations/${row.original.id}`}>
                {cell.getValue()}
            </Link>;
        },
    }),
    columnHelper.accessor('position', {
        header: 'Position',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('declarationDate', {
        header: 'Declaration Date',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('risk', {
        header: 'Risk',
        cell: info => info.getValue(),
    }),
];

export const DeclarationsPage = () => {
    const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() })

    return (
        <Layout title='Declarations'>
            <Sheet variant='outlined'>
                <ArasTable table={table} />
            </Sheet>
        </Layout>
    );
};

