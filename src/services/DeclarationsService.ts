import { Db, Filter, FindOptions, ObjectId } from 'mongodb';
import { client } from '../db/mongoClient';
import * as weightsData from './weights.json';

interface Options {
    limit: number;
    skip: number;
    filters: {
        query: string;
        year: string;
        declarationType: string;
        declarantType: string;
        institution: string;
    }
}

export interface Declaration {
    id: string;
    name: string;
    declarant: string;
    declarantType: string;
    institutionGroup: string;
    institution: string;
    position: string;
    submissionDate: string;
    year: number;
    type: string;
}

class DeclarationsService {
    private db: Db;

    constructor(
        dbName: string, 
        private readonly collectionName: string
    ) {
        this.db = client.db(dbName);
      }

    async getAllDeclarations(options: Options) {
        const declarations = await this.db.collection(this.collectionName)
            .find(this.mapFilters(options.filters))
            .sort('risk.QPDRI.QPDRI', -1)
            .skip(options.skip)
            .limit(options.limit)
            .toArray();

        return declarations;
    }

    async countDeclarations(options: Pick<Options, 'filters'>) {
        const count = await this.db.collection(this.collectionName)
            .countDocuments(this.mapFilters(options.filters));
        return count;
    }

    async getDeclarationsByDeclarantId(declarantId: number) {
        const declarations = await this.db.collection(this.collectionName)
            .find({ declarantId })
            .sort('year', 1)
            .toArray();

        return declarations;
    }

    mapFilters(filters: Options['filters']): Filter<any> {
        const mongoFilters: Record<string, any> = {
            declarantId: { $exists: true },
        };

        if (filters.query) {
            mongoFilters.$text = { $search: filters.query };
        }

        if (filters.year) {
            mongoFilters.year = parseInt(filters.year, 10);
        }

        if (filters.declarationType) {
            mongoFilters.type = filters.declarationType;
        }

        if (filters.declarantType) {
            mongoFilters.declarantType = filters.declarantType;
        }

        if (filters.institution) {
            mongoFilters.institutionGroup = filters.institution;
        }

        return mongoFilters;
    }
}

export const declarationsService = new DeclarationsService('corruption', 'declarations');