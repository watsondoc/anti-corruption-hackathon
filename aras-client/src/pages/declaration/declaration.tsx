import React from "react";
import { useQuery } from "react-query";
import { Box, CircularProgress, Stack } from "@mui/joy";
import { declaration, DECLARATIONS, HOME } from "../../breadcrumbs";
import { Layout } from "../../components/layout";
import { GeneralInfo } from "./general-info";
import { AssetsTable } from "./assets-table";
import { RiskIndicatorsProfile } from "./risk-indicators-profile";
import { publicOfficial as mockData } from "./mock-data";
import { Charts } from "./charts";

export const DeclarationPage: React.FC = () => {
  const publicOfficialQuery = useQuery({
    queryKey: ["public-official"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockData;
    },
  })

  const publicOfficial = publicOfficialQuery.data;
  return (
    <Layout title={publicOfficial?.name ?? ''} breadcrumbs={[HOME, DECLARATIONS, declaration('1', publicOfficial?.name ?? '')]}>
      {
        publicOfficialQuery.isLoading && <Box display='flex' justifyContent='center' p={4}>
          <CircularProgress />
        </Box>
      }
      {
        publicOfficial && <>
        <GeneralInfo publicOfficial={publicOfficial} />
        <Box display="flex" gap={2} flexWrap="wrap">
          <RiskIndicatorsProfile publicOfficial={publicOfficial} />
          <Charts data={publicOfficial.dynamicData} />    
        </Box>
        <AssetsTable assets={publicOfficial.currentAssets} />
        </>
      }
    </Layout>
  );
};
