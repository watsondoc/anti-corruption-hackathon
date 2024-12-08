import express from "express";
import dotenv from "dotenv";
import exampleRoutes from "./routes/webRoutes";
import weightRoutes from './routes/weightRoutes';
import declarationsRouter from './routes/declarationsRouter';
import { connectToDatabase } from "./db/mongoClient";
import { JSONToMongoParser } from './parser/JSONToMongoParser';
import * as path from 'path';
import { weightsService } from './services/WeightsService';
import { DeclarantsSeeder } from "./parser/DeclarantsSeeder";
import { riskCalculationService } from './services/RiskCalculationService';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use("/api", exampleRoutes);
app.use("/api/declarations", declarationsRouter);
app.use("/api/weights", weightRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(
    `[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl} - ${err.message}`,
    err.stack
  );

  res.status(500).send({
    message: "Internal server error",
    error: err,
  });

  next(err);
});

// Start the server and connect to MongoDB
const startServer = async () => {
  await connectToDatabase();

  // await riskCalculationService.calculateByYearQPDRI(2024);
  // await riskCalculationService.calculateByYearQPDRI(2023);
  // await riskCalculationService.calculateByYearQPDRI(2022);
  // await riskCalculationService.calculateByYearQPDRI(2021);

  // await riskCalculationService.calculateByYearAbrTRI(2024);
  // await riskCalculationService.calculateByYearAbrTRI(2023);
  // await riskCalculationService.calculateByYearAbrTRI(2022);
  // await riskCalculationService.calculateByYearAbrTRI(2021);

  // await riskCalculationService.calculateByYearTotalIncome(2021);
  // await riskCalculationService.calculateByYearTotalIncome(2022);
  // await riskCalculationService.calculateByYearTotalIncome(2023);
  // await riskCalculationService.calculateByYearTotalIncome(2024);

  /*const parser = new JSONToMongoParser('corruption', 'declarations');

  await parser.loadDeclarations(
    path.resolve(__dirname, '../seedData/general_2024.json'),
    path.resolve(__dirname, '../seedData/details_2024.json'),
  );*/

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();
