import { Request, Response } from "express";
import { client } from "../db/mongoClient";

const getExampleData = async (req: Request, res: Response) => {
  try {
    const db = client.db("corruption");
    const collection = db.collection("exampleCollection");

    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch data" });
  }
};

const createExampleData = async (req: Request, res: Response) => {
  try {
    const db = client.db("corruption");
    const collection = db.collection("exampleCollection");

    const result = await collection.insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: "Failed to create data" });
  }
};

export { getExampleData, createExampleData };
