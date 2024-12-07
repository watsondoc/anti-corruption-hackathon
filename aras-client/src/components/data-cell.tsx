import { Typography } from "@mui/joy";
import React from "react";

interface DataCellProps {
    risk: number;
    children: string;
}

export const DataCell = ({ children }: DataCellProps) => {
    return (
        <Typography>
            {children}
        </Typography>
    );
}