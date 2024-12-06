import express from "express";
import dotenv from "dotenv";
import exampleRoutes from "./routes/webRoutes";
import { connectToDatabase } from "./db/mongoClient";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use("/api", exampleRoutes);

// Start the server and connect to MongoDB
const startServer = async () => {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();
