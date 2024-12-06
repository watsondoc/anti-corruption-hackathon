import React from 'react';
import { Link as RouterLink } from 'react-router'
import { Table, Link } from '@mui/joy';
import { Layout } from '../components/layout';

const declarations = [
    { id: 1, name: 'John Doe', position: 'Mayor', declarationDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', position: 'Council Member', declarationDate: '2023-02-10' },
    // Add more declarations as needed
];

export const DeclarationsPage: React.FC = () => {
    return (
        <Layout title='Declarations'>
            <Table
                borderAxis="xBetween"
                color="neutral"
            >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Declaration Date</th>
                    </tr>
                </thead>
                <tbody>
                    {declarations.map((declaration) => (
                        <tr key={declaration.id}>
                            <td>{declaration.name}</td>
                            <td>
                                <Link component={RouterLink} to={`/declarations/${declaration.id}`}>
                                    {declaration.name}
                                </Link>
                            </td>
                            <td>{declaration.position}</td>
                            <td>{declaration.declarationDate}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Layout>
    );
};
