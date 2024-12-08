import { Select, Typography, Option, SelectProps } from "@mui/joy";
import { useId } from "react";
import './select.css';

interface Option {
    id: string;
    label: string;
}

interface SelectInput2Props extends SelectProps<string, false> {
  label: string;
  options: Option[];
}

export const ArasSelect2 = ({ label, options, ...rest }: SelectInput2Props) => {
  const id = useId();
  const labelId = `${id}-label`;
  return (
    <>
      <label htmlFor={id} id={labelId} className="select-label">
        <Typography level="body-xs">{label}</Typography>
      </label>
      <Select
        id={id}
        defaultValue={options?.[0].id}
        slotProps={{
          button: {
            id,
            "aria-labelledby": [labelId, id].join(" "),
          },
        }}
        {...rest}
      >
        {options.map((option) => (
          <Option key={option.id} value={option.id}>
            {option.label}
          </Option>
        ))}
      </Select>
    </>
  );
};
