import { Link as RouterLink } from 'react-router'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'

import { Table, Link } from '@mui/joy';
import { Layout } from '../components/layout';


interface Declaration {
    id: string;
    name: string;
    position: string;
    declarationDate: string;
}


const data: Declaration[] = [
    { id: '1', name: 'John Doe', position: 'Mayor', declarationDate: '2023-01-15' },
    { id: '2', name: 'Jane Smith', position: 'Council Member', declarationDate: '2023-02-10' },
    // Add more declarations as needed
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
];

export const DeclarationsPage = () => {
    const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() })

    return (
        <Layout title='Declarations'>
            <Table
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
                    <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </Table>
        </Layout>
    );
};

