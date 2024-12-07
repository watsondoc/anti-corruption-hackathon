import { Container, Box, Link, Typography, Breadcrumbs } from "@mui/joy";
import { Link as RouterLink, useLocation } from "react-router";
import reactSvg from "../assets/react.svg";

interface Props {
  title: string;
  children?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
}

interface Breadcrumb {
  label: string;
  href: string;
}

const navbar = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Declarations",
    href: "/declarations",
  },
  {
    label: "Risk Indicators",
    href: "/risk-indicators",
  },
];

export const Layout = ({ children, title, breadcrumbs }: Props) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <Container>
      <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 2,
        }}
        flexWrap="wrap"
        gap={2}
      >
        <Box display="flex" alignItems="center">
          <Link
            component={RouterLink}
            to="/"
            disabled={isHome}
            sx={{
              "&:hover": { textDecoration: "none" },
              cursor: isHome ? "default" : "pointer",
            }}
          >
            <img src={reactSvg} alt="Logo of the system" />
            <Typography ml={1} component="h1" level="title-lg">
              Automated Risk Analysis
            </Typography>
          </Link>
        </Box>

        <Box>
          {navbar.map(({ label, href }) => (
            <Link
              key={href}
              component={RouterLink}
              to={href}
              sx={{ mx: 2 }}
              disabled={location.pathname === href}
            >
              {label}
            </Link>
          ))}
        </Box>
      </Box>
      <Box component="main" sx={{ p: 2 }}>
        <Breadcrumbs sx={{ px: 0 }}>
          {breadcrumbs?.map(({ label, href }) => (
            <Link
              key={href}
              component={RouterLink}
              to={href}
              disabled={location.pathname === href}
            >
              {label}
            </Link>
          ))}
        </Breadcrumbs>
        <Typography level="h2">{title}</Typography>
        <Box pt={2} display="flex" gap={2} flexDirection="column">
          {children}
        </Box>
      </Box>
    </Container>
  );
};
