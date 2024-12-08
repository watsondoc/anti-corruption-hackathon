import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Input, Snackbar, Stack } from "@mui/joy";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { HOME, RISK_INDICATORS } from "../breadcrumbs";
import { Layout } from "../components/layout";
import { ArasTable, Record } from "../components/table";
import { useMutation, useQuery } from "react-query";

interface RiskIndicator extends Record {
  title: string;
  prevWeight: number;
  weight: number;
  description: string;
}

const d: Omit<RiskIndicator, "prevWeight">[] = [
  {
    title: "Risk Indicator 1",
    weight: 20,
    description: "This is a risk indicator",
  },
  {
    title: "Risk Indicator 2",
    weight: 10,
    description: "This is another risk indicator",
  },
  {
    title: "Risk Indicator 3",
    weight: 99,
    description: "This is a third risk indicator",
  },
];

const columnHelper = createColumnHelper<RiskIndicator>();

const columns = [
  columnHelper.accessor("title", {
    header: "Risk Indicator (Red Flag)",
    size: 150,
    cell: (title) => title.getValue(),
  }),
  columnHelper.accessor("prevWeight", {
    header: "Current Weight",
    size: 75,
    cell: (prevWeight) => prevWeight.getValue().toFixed(0),
  }),
  columnHelper.accessor("weight", {
    header: "New Weight",
    size: 75,
    cell: (cell) => {
      const initialValue = cell.getValue();
      const [value, setValue] = useState<string>(initialValue.toFixed(0));

      useEffect(() => {
        setValue(initialValue.toFixed(0));
      }, [initialValue]);

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        let num = parseInt(value);

        if (isNaN(num)) {
          num = 0;
        }

        if (num < 0) {
          num = 0;
        }

        if (num > 100) {
          num = 100;
        }

        setValue(num.toString());

        (cell.table.options.meta as any)?.updateData?.(
          cell.row.index,
          cell.column.id,
          num
        );
      };

      return (
        <Input
          type="number"
          value={value}
          disabled={(cell.table.options.meta as any).disabled}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    },
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (description) => description.getValue(),
    size: 300,
  }),
];

export const RiskIndicatorsPage = () => {
  const [originalData, setOriginalData] = useState<
    Omit<RiskIndicator, "prevWeight">[]
  >([]);
  const [data, setData] = useState<RiskIndicator[]>([]);

  const riskIndicatorsQuery = useQuery({
    queryKey: ["risk-indicators"],
    queryFn: async () => {
      const response = await fetch('/api/weights/all');
      const data = await response.json();

      return data;
    },
  });

  const updateState = (fetchedData: Omit<RiskIndicator, 'prevWeight'>[]) => {
    if (fetchedData) {
      const currentData = fetchedData.map(({ ...row }) => {
        return { ...row, prevWeight: row.weight };
      });
      const original = fetchedData.map(({ ...row }) => {
        return { ...row, prevWeight: row.weight };
      });
      setData(currentData);
      setOriginalData(original);
    } else {
      setData([]);
      setOriginalData([]);
    }
  }

  const updateRiskIndicatorsMutation = useMutation({ mutationFn: async () => {
    const response = await fetch('/api/weights', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const updatedData = await response.json();
    updateState(updatedData.data);
  }});

  useEffect(() => {
    const fetchedData = riskIndicatorsQuery.data;
    updateState(fetchedData);
  }, [riskIndicatorsQuery.data]);

  const isChanged = useMemo(() => {
    return JSON.stringify(originalData) !== JSON.stringify(data);
  }, [originalData, data]);

  const disabled = !isChanged || riskIndicatorsQuery.isLoading || updateRiskIndicatorsMutation.isLoading;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      disabled: riskIndicatorsQuery.isLoading || updateRiskIndicatorsMutation.isLoading,
      updateData: (rowIndex: any, columnId: any, value: any) => {
        // Skip page index reset until after next rerender
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    } as any,
  });

  const onReset = () => {
    setData((prevData) => {
      return prevData.map((row) => {
        return { ...row, weight: row.prevWeight };
      });
    });
  };

  const onSave = () => {
    updateRiskIndicatorsMutation.mutate();
  }

  return (
    <Layout title="Risk Indicators" breadcrumbs={[HOME, RISK_INDICATORS]}>
      <Stack gap={1} direction="row">
        <Button disabled={disabled} onClick={onSave}>Save changes</Button>
        <Button disabled={disabled} color="neutral" onClick={onReset}>
          Reset
        </Button>
      </Stack>
      <Card>
        <ArasTable table={table} paginationType="off" isLoading={riskIndicatorsQuery.isLoading} />
      </Card>
      <Snackbar
        open={updateRiskIndicatorsMutation.isError}
        autoHideDuration={6000}
        onClose={() => updateRiskIndicatorsMutation.reset()}
        color='danger'
      >
        Failed to update risk indicators. Please try again later.
      </Snackbar>
      <Snackbar
        open={updateRiskIndicatorsMutation.isSuccess}
        autoHideDuration={6000}
        onClose={() => updateRiskIndicatorsMutation.reset()}
        color='success'
      >
        Risk indicators updated successfully.
      </Snackbar>

    </Layout>
  );
};
