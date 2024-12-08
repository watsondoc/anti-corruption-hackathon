import { Card, CardContent, Stack, Typography } from "@mui/joy";
import { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";

interface ChartsProps {
  assets: { year: number; value: number }[];
  income: { year: number; value: number }[];
}

interface AssetsChartProps {
    assets: { year: number; value: number }[];
    max: number;
}

const AssetsChart = ({ assets, max }: AssetsChartProps) => {
  const primaryAxis = useMemo(
    (): AxisOptions<(typeof assets)[number]> => ({
      getValue: (datum) => datum.year.toFixed(0),
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<(typeof assets)[number]>[] => [
      {
        getValue: (datum) => datum.value,
        elementType: "bar",
        min: 0,
        max: max,
      },
    ],
    []
  );

  return (
    <Chart
      options={{
        data: [{ data: assets, label: "Assets" }],
        primaryAxis,
        secondaryAxes,
      }}
    />
  );
};


interface IncomeChartProps {
    income: { year: number; value: number }[];
    max: number;
}

const IncomeChart = ({ income, max }: IncomeChartProps) => {
  const primaryAxis = useMemo(
    (): AxisOptions<(typeof income)[number]> => ({
      getValue: (datum) => datum.year.toFixed(0),
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<(typeof income)[number]>[] => [
      {
        elementType: 'area',
        getValue: (datum) => datum.value,
        min: 0,
        max: max,
      },
    ],
    []
  );

  return (
    <Chart
      options={{
        data: [{ data: income, label: "Income" }],
        primaryAxis,
        secondaryAxes,
      }}
    />
  );
};

export const Charts = ({ assets, income }: ChartsProps) => {
  const max = Math.max(
    ...assets.map((x) => x.value),
    ...income.map((x) => x.value)
  );

  return (
    <Stack direction="column" gap={2} flex='1 0'>
      <Card sx={{ height: 250 }}>
        <Typography level="title-md">Assets vs. year</Typography>
        <CardContent>
          <AssetsChart assets={assets} max={max} />
        </CardContent>
      </Card>
      <Card sx={{ height: 250 }}>
        <Typography level="title-md">Income vs. year</Typography>
        <CardContent>
          <IncomeChart income={income} max={max} />
        </CardContent>
      </Card>
    </Stack>
  );
};
