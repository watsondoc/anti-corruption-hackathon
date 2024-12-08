import { Request, Response } from "express";
import { WeightItem, weightsService } from '../services/WeightsService';

const toApiModel = ({ id, weight, title, description }: Record<string, any>): WeightItem => {
  return { id, weight, title, description }
}

const getAllWeights = async (req: Request, res: Response) => {
  try {
    const data = await weightsService.getAllWeightItems();
    res.json(data.map(toApiModel));
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch data" });
  }
};

const getWeightById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await weightsService.getWeightById(id);
    res.status(201).json(toApiModel(result));

  } catch (err) {
    res.status(500).send({ error: "Failed to create data" });
  }
}

const bulkUpdateWeights = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    // Perform the update
    const result = await weightsService.bulkUpdateWeights(body);

    // Check the result
    if (result.matchedCount === 0) {
      console.log("No document found with the given ids.");
    } else {
      console.log(`Successfully updated ${result.modifiedCount} document.`);
    }

    const data = await weightsService.getAllWeightItems();
    res.status(200).json({ updated: result.modifiedCount, data: data.map(toApiModel) });
  } catch (err) {
    res.status(500).send({ error: "Failed to upsert data" });
  }
}

const updateWeights = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;

    // Perform the update
    const result = await weightsService.updateWeightItem(id, body.weight);

    // Check the result
    if (result.matchedCount === 0) {
      console.log("No document found with the given id.");
    } else {
      console.log(`Successfully updated ${result.modifiedCount} document.`);
    }

    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: "Failed to create data" });
  }
};

export { getAllWeights, getWeightById, updateWeights, bulkUpdateWeights };
