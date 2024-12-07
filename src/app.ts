import express from "express";
import dotenv from "dotenv";
import exampleRoutes from "./routes/webRoutes";
import weightRoutes from './routes/weightRoutes';
import { connectToDatabase } from "./db/mongoClient";
import { JSONToMongoParser } from './parser/JSONToMongoParser';
import * as path from 'path';
import { weightsService } from './services/WeightsService';
import { DeclarantsSeeder } from "./parser/DeclarantsSeeder";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use("/api", exampleRoutes);
app.use("/api/weights", weightRoutes);

// Start the server and connect to MongoDB
const startServer = async () => {
  await connectToDatabase();

  // const weightsSeeder = new WeightsService('corruption', 'weights');
  // await weightsSeeder.generateWeights();

  const parser = new JSONToMongoParser('corruption', 'declarations');

  // await parser.loadDeclarations(
  //   path.resolve('D:/Projects/anti-corruption-hackathon/data/final_data/declarations/general_2021.json'),
  //   path.resolve('D:/Projects/anti-corruption-hackathon/data/final_data/declarations/details_2021.json'),
  // );

  // const declarantsSeeder = new DeclarantsSeeder();
  // await declarantsSeeder.seedDeclarants(
  //   path.resolve('D:/Projects/anti-corruption-hackathon/utils/parse-ids-mapping/declarationsByDeclarant.json')
  // );

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();
