import { useState } from "react";
import { Card, Input } from "@mui/joy";

import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { HOME, RISK_INDICATORS } from "../breadcrumbs";
import { Layout } from "../components/layout";
import { ArasTable, Record } from "../components/table";

interface RiskIndicator extends Record {
  title: string;
  weight: number;
  description: string;
}

const d: RiskIndicator[] = [
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
  columnHelper.accessor("weight", {
    header: "Weight",
    size: 150,
    cell: (cell) => {
        const initialValue = cell.getValue()
        const [value, setValue] = useState<string>(initialValue.toFixed(0))

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

            (cell.table.options.meta as any)?.updateData?.(cell.row.index, cell.column.id, num)
        }
      
      return <Input 
        type="number"
        value={value} 
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    },
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (description) => description.getValue(),
    size: 300,
  }),
];

export const RiskIndicatorsPage = () => {
  const [data, setData] = useState<RiskIndicator[]>(d);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
        updateData: (rowIndex: any, columnId: any, value: any) => {
            // Skip page index reset until after next rerender
            setData(old =>
              old.map((row, index) => {
                if (index === rowIndex) {
                  return {
                    ...old[rowIndex]!,
                    [columnId]: value,
                  }
                }
                return row
              })
            )
        },
    } as any,
  });

  return (
    <Layout title="Risk Indicators" breadcrumbs={[HOME, RISK_INDICATORS]}>
      <Card>
        <ArasTable 
            table={table} 
            paginationType="off"
        />
      </Card>
    </Layout>
  );
};

