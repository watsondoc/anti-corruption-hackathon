import React from 'react';
import { Layout } from '../components/layout';

export const DeclarationPage: React.FC = () => {
    const publicOfficial = {
        name: 'John Doe',
        position: 'Mayor',
        income: '$100,000',
        assets: [
            { type: 'Real Estate', value: '$500,000' },
            { type: 'Vehicle', value: '$30,000' },
        ],
        riskIndicators: [
            'High income to asset ratio',
            'Unexplained wealth',
        ],
    };

    return (
        <Layout title='John Doe'>
            <div>
                <h1>Declaration of {publicOfficial.name}</h1>
                <h2>Position: {publicOfficial.position}</h2>
                
                <section>
                    <h3>Income</h3>
                    <p>{publicOfficial.income}</p>
                </section>
                
                <section>
                    <h3>Assets</h3>
                    <ul>
                        {publicOfficial.assets.map((asset, index) => (
                            <li key={index}>{asset.type}: {asset.value}</li>
                        ))}
                    </ul>
                </section>
                
                <section>
                    <h3>Risk Indicators</h3>
                    <ul>
                        {publicOfficial.riskIndicators.map((indicator, index) => (
                            <li key={index}>{indicator}</li>
                        ))}
                    </ul>
                </section>
            </div>
        </Layout>
    );
};
