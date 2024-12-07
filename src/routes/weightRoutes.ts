import express from "express";
import { getAllWeights, updateWeights, getWeightById } from '../controllers/weightsController';

const router = express.Router();

router.get("/all", getAllWeights);
router.get("/:id", getWeightById);
router.post("/:id", updateWeights);

export default router;
