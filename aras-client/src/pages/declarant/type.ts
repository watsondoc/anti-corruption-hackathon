
import { Record } from "../../components/table";

export interface Asset extends Record {
    risk?: number;
    type: string;
    value: string;
}

export interface PublicOfficial {
    name: string;
    position: string;
    income: string;
    risk: number;
    riskIndicators: string[];
    currentAssets: Asset[];
    dynamicData: {
        assets: { year: number; value: number }[];
        income: { year: number; value: number }[];
    };
}