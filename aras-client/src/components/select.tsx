import { Select, Typography, Option, SelectProps } from "@mui/joy";
import { useId } from "react";
import './select.css';

interface SelectInputProps extends SelectProps<string, false> {
  label: string;
  options: string[];
}

export const ArasSelect = ({ label, options, ...rest }: SelectInputProps) => {
  const id = useId();
  const labelId = `${id}-label`;
  return (
    <>
      <label htmlFor={id} id={labelId} className="select-label">
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
        {...rest}
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
