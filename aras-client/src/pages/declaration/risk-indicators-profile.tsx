import { Card, Box, Typography, CardContent, List, ListItem } from "@mui/joy";
import { PublicOfficial } from "./type";

interface RiskIndicatorsProfileProps {
    publicOfficial: PublicOfficial;
}

export const RiskIndicatorsProfile = ({ publicOfficial }: RiskIndicatorsProfileProps) => {
    return <Card variant="outlined" sx={{ flex: "1 1", minWidth: 300 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography level="title-md">Risk indicators:</Typography>
        <Typography level="title-md">
          Risk Rating:
          <Typography ml={1} level="title-md" color="danger" component="span">
            {publicOfficial.risk}
          </Typography>
        </Typography>
      </Box>
      <CardContent>
        <List marker="disc">
          {publicOfficial.riskIndicators.map((indicator, index) => (
            <ListItem key={index}>{indicator}</ListItem>
          ))}
        </List>
      </CardContent>
    </Card>;
  };
  
  