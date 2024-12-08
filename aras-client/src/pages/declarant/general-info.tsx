import { Card, Typography, CardContent, List, ListItem } from "@mui/joy";
import { formatCurrency } from "../../utils";
import { Declaration } from "../declarations";

interface GeneralInfoProps {
  declaration: Declaration;
}

export const GeneralInfo = ({ declaration }: GeneralInfoProps) => {
  return (
    <Card sx={{ flex: "1 1", minWidth: 250 }}>
      <Typography level="title-md">General Info</Typography>
      <CardContent>
        <List marker="disc">
          <ListItem>Full Name: {declaration.declarant}</ListItem>
          <ListItem>Declarant Type: {declaration.declarantType}</ListItem>
          <ListItem>Declaration Type: {declaration.type}</ListItem>
          <ListItem>Institution group: {declaration.institutionGroup}</ListItem>
          <ListItem>Institution: {declaration.institution}</ListItem>
          <ListItem>Position: {declaration.position}</ListItem>
          <ListItem>Total Income: {formatCurrency(declaration.income)}</ListItem>
          <ListItem>Total Assets: {formatCurrency(declaration.assets)}</ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
