import express from "express";
import { getAllWeights, updateWeights, getWeightById, bulkUpdateWeights } from '../controllers/weightsController';

const router = express.Router();

router.get("/all", getAllWeights);
router.get("/:id", getWeightById);
router.post("/:id", updateWeights);
router.put("/", bulkUpdateWeights);

export default router;
