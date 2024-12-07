import React from 'react';
import { Layout } from '../components/layout';
import { useQuery } from 'react-query';
import { Typography, CircularProgress } from '@mui/joy';

export const MainPage: React.FC = () => {
    const catFact = useQuery('cat-fact', async () => {
        const response = await fetch('https://bible-api.com/?random=verse');
        return response.json().then(({ text, reference }) => ({ text, reference }));
    });

    return (
        <Layout title='Home'>
            <Typography level='body-md'>Welcome to the home page!</Typography>
            {catFact.isLoading && <CircularProgress sx={{ alignSelf: 'center' }}/>}
            {catFact.data && <Typography level='body-sm'>{catFact.data.text}</Typography>}
            {catFact.data && <Typography level='body-xs'>{catFact.data.reference}</Typography>}
        </Layout>
    );
};
