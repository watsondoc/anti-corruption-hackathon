import * as fs from "fs/promises";
import { client } from "../db/mongoClient";
import { Declarant } from "./../../interfaces/Declarant";

export class DeclarantsSeeder {
    collectionName: string = "declarants";
    dbName: string = "corruption";

    async seedDeclarants(declarantsMapptingPath: string) {
        const declarants: DeclarantsSeedData = JSON.parse(await fs.readFile(declarantsMapptingPath, 'utf-8'));

        let declarantsToInsert: Declarant[] = [];

        for (const [declarantId, declarantData] of Object.entries(declarants)) {
            const declarant: Declarant = {
                id: parseInt(declarantId),
                declarationIds: declarantData.map(declaration => declaration.declarationId)
            }

            declarantsToInsert.push(declarant);

            if (declarantsToInsert.length > 500) {
                await client.close();
                await client.connect();

                const db = client.db(this.dbName);
                const collection = db.collection(this.collectionName);

                console.log(`Inserting declarants chunk...`);
                await collection.insertMany(declarantsToInsert);
                console.log(`Inserted ${declarantsToInsert.length} declarants`);

                declarantsToInsert = [];
            }
        }
    }
}


type DeclarantsSeedData = {
    [declarantId: string]: [
        {
            declarationId: string;
            declarationKind: string;
            name: string;
        }
    ]
}
