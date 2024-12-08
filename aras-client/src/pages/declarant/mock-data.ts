import { Asset, PublicOfficial } from "./type";

export const publicOfficial: PublicOfficial = {
    name: "John Doe",
    risk: 0.87,
    position: "Mayor",
    income: '100000',
    currentAssets: [
      { type: "Real Estate", value: '500000' },
      { type: "Vehicle", value: '30000' },
      { type: "Bank Account", value: '20000' },
      { type: "Stocks", value: '10000' },
    ] as Asset[],
    riskIndicators: [
      "High income to asset ratio",
      "Unexplained wealth",
      "High risk industry",
      "High risk jurisdiction",
    ],
    dynamicData: {
      assets: [
        {
          year: 2021,
          value: 100000,
        },
        {
          year: 2022,
          value: 110000,
        },
        {
          year: 2023,
          value: 120000,
        },
        {
          year: 2024,
          value: 130000,
        }
      ],
      income: [
        {
          year: 2021,
          value: 15000,
        },
        {
          year: 2022,
          value: 35000,
        },
        {
          year: 2023,
          value: 13000,
        },
        {
          year: 2024,
          value: 20000,
        }
      ]
    }
  };