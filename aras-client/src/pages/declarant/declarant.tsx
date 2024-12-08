import React from "react";
import { useQuery } from "react-query";
import { Box, CircularProgress, Stack } from "@mui/joy";
import { declarant, DECLARATIONS, HOME } from "../../breadcrumbs";
import { Layout } from "../../components/layout";
import { GeneralInfo } from "./general-info";
import { useParams } from "react-router";
import { Declaration } from "../declarations";
import { RiskIndicatorsProfile } from "./risk-indicators-profile";
import { IncomeTable } from "./income-table";
import { ArasSelect2 } from "../../components/select2";
import { Charts } from "./charts";

export const DeclarantPage: React.FC = () => {
  const declarantId = useParams().id!;
  const [declaration, setDeclaration] = React.useState<Declaration | null>(
    null
  );

  const publicOfficialQuery = useQuery({
    queryKey: ["public-official"],
    queryFn: async () => {
      const data = await fetch(
        `/api/declarants/${declarantId}/declarations`
      ).then((res) => res.json());

      if (data.length > 0) {
        setDeclaration(data[data.length - 1]);
      }

      return data as Declaration[];
    },
  });

  const declarations = publicOfficialQuery.data;
  const fullName = declaration?.declarant ?? "";

  const incomeByYear = declarations?.map((declaration) => ({
    year: declaration.year,
    value: declaration.income,
  })) ?? [];

  console.log('Income by year:', incomeByYear);

  return (
    <Layout
      title={fullName}
      breadcrumbs={[HOME, DECLARATIONS, declarant(declarantId, fullName ?? "")]}
    >
      {publicOfficialQuery.isLoading && (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      )}
      {!declaration && !publicOfficialQuery.isLoading && (
        <Box display="flex" justifyContent="center" p={4}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box mb={2} fontSize={20}>
              No data found
            </Box>
            <Box fontSize={14}>There is no data for this declarant</Box>
          </Box>
        </Box>
      )}
      {declaration && (
        <>
          <Box>
            <ArasSelect2 
              label="Declaration"
              options={publicOfficialQuery.data!.map(({ year, type, id }) => ({
                label: `${year} - ${type} (${id})`,
                id,
              }))}
              onChange={(_event, value) => {
                if (!value) {
                  return;
                }

                const selectedDeclaration = publicOfficialQuery.data!.find(
                  (declaration) => declaration.id == value
                );

                if (selectedDeclaration) {
                  setDeclaration(selectedDeclaration);
                }
              }}
            />
          </Box>
          <GeneralInfo declaration={declaration} />
          <Box display="flex" gap={2} flexWrap="wrap">
            <Stack direction='column' gap={2}>
              <RiskIndicatorsProfile declaration={declaration} />
              <IncomeTable income={declaration.incomeAgg ?? {}} />
            </Stack>

            <Charts 
              income={incomeByYear} 
              assets={incomeByYear}
            />
            {/* {publicOfficial!.dynamicData && (
              
            )} */}
          </Box>
        </>
      )}
    </Layout>
  );
};
