import express from "express";
import { getExampleData, createExampleData } from "../controllers/exampleController";

const router = express.Router();

router.get("/examples", getExampleData);
router.post("/examples", createExampleData);

export default router;
