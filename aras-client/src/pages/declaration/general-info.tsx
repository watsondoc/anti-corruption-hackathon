import { Card, Typography, CardContent, List, ListItem } from "@mui/joy";
import { formatCurrency } from "../../utils";
import { PublicOfficial } from "./type";

interface GeneralInfoProps {
  publicOfficial: PublicOfficial;
}

export const GeneralInfo = ({ publicOfficial }: GeneralInfoProps) => {
  return (
    <Card sx={{ flex: "1 1", minWidth: 250 }}>
      <Typography level="title-md">General Info</Typography>
      <CardContent>
        <List marker="disc">
          <ListItem>Full Name: {publicOfficial.name}</ListItem>
          <ListItem>Position: {publicOfficial.position}</ListItem>
          <ListItem>Income: {formatCurrency(publicOfficial.income)}</ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
