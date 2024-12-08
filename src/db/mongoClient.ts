import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI || "mongodb+srv://qinamrug:newara123@hackathon.smxta.mongodb.net/?retryWrites=true&w=majority&appName=Hackathon";

// mongodb://root:password@localhost:27017/admin

const client = new MongoClient(uri);

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

export { client, connectToDatabase };
