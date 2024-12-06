import { Container, Box, Link, Typography } from '@mui/joy';
import { Link as RouterLink } from 'react-router';
import reactSvg from '../assets/react.svg';

interface Props {
    title: string;
    children?: React.ReactNode;
}

export const Layout = ({ children, title }: Props) => {
    return (
        <Container>
            <Box component="header" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
                <img src={reactSvg} />
                <Box>
                    <Link component={RouterLink} to="/" sx={{ mx: 2 }}>
                        Home
                    </Link>
                    <Link component={RouterLink} to="/declarations" sx={{ mx: 2 }}>
                        Declarations
                    </Link>
                </Box>
            </Box>
            <Box component="main" sx={{ py: 2 }}>
                <Typography level='h1'>{title}</Typography>
                <Box pt={2}>
                    {children}
                </Box>
            </Box>
        </Container>
    );
};
