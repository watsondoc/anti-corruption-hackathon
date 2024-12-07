import { Select, Typography, Option } from "@mui/joy";
import { useId } from "react";

interface SelectInputProps {
  label: string;
  options: string[];
}

export const ArasSelect = ({ label, options }: SelectInputProps) => {
  const id = useId();
  const labelId = `${id}-label`;
  return (
    <>
      <label htmlFor={id} id={labelId}>
        <Typography level="body-xs">{label}</Typography>
      </label>
      <Select
        id={id}
        defaultValue={options?.[0]}
        slotProps={{
          button: {
            id,
            "aria-labelledby": [labelId, id].join(" "),
          },
        }}
      >
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </>
  );
};
