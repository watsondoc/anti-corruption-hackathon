import express from "express";
import dotenv from "dotenv";
import exampleRoutes from "./routes/webRoutes";
import { connectToDatabase } from "./db/mongoClient";
import { JSONToMongoParser } from './parser/JSONToMongoParser';
import * as path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use("/api", exampleRoutes);

// Start the server and connect to MongoDB
const startServer = async () => {
  await connectToDatabase();

  const parser = new JSONToMongoParser('corruption', 'declarations');

  await parser.parseAndInsert(path.resolve(__dirname, '../seedData/details_2024.json'));

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();
