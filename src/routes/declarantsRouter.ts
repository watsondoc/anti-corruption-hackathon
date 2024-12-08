import express from "express";
import { declarationsService } from '../services/DeclarationsService';
import { toApiModel } from "./declarationsRouter";

const router = express.Router();

router.get("/:declarantId/declarations", async (req, res) => {
    const { declarantId } = req.params;

    if (!declarantId.trim()) {
        res.status(400).send({ message: 'Declarant ID is required' });
    }

    if (isNaN(parseInt(declarantId, 10))) {
        res.status(400).send({ message: 'Declarant ID must be a number' });
    }

    try {
        const data = await declarationsService.getDeclarationsByDeclarantId(parseInt(declarantId, 10))
        res.send(data.map(toApiModel));
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error', error });
    }
});

export default router;
