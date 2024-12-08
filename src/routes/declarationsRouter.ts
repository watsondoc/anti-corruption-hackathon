import express from "express";
import { declarationsService } from '../services/DeclarationsService';

const router = express.Router();

export const toApiModel = ({
    id,
    name,
    declarant,
    declarantId,
    declarantType,
    institutionGroup,
    institution,
    position,
    submissionDate,
    year,
    type,
    risk,
    incomeAgg,
}: Record<string, any>) => {
    const riskIndicators = [];

    if (risk?.QPDRI?.QPDRI === 1) {
        riskIndicators.push("Quantitative deviation of owned/occupied property from the average");
    }

    let income = 0;

    for (const key in incomeAgg) {
        income += incomeAgg[key];
    }

    return {
        id,
        name,
        declarant,
        declarantId,
        declarantType,
        institutionGroup,
        institution,
        position,
        submissionDate,
        year,
        type,
        risk,
        riskIndicators,
        riskRating: risk?.QPDRI?.QPDRI ?? 0,
        income,
        incomeAgg,
    }
}

const parseQueryOptions = (query: Record<string, any>) => {
    const { limit: queryLimit, skip: querySkip, ...filters } = query;
    let limit = queryLimit ? parseInt(queryLimit, 10) : 10;
    let skip = querySkip ? parseInt(querySkip, 10) : 0;

    if (limit < 0) {
    limit = 10;
    } else if (limit > 100) {
        limit = 100;
    }

    if (skip < 0) {
        skip = 0;
    }

    return { limit, skip, filters };
}

router.get("/", async (req, res) => {
    try {
        console.log('GET /api/declarations');
        const { limit, skip, filters } = parseQueryOptions(req.query);

        const declarations = await declarationsService.getAllDeclarations({ limit, skip, filters: filters as any });
        const total = await declarationsService.countDeclarations({ filters: filters as any});
    
        res.send({
            data: declarations.map(toApiModel),
            total,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error", error });
    }
});

export default router;