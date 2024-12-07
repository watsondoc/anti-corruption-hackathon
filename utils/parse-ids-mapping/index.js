const fs = require('fs');
const path = require('path');

const parseCSV = (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line !== '');

    const rows = lines.slice(1).map(line => {
        const columns = line.split(',');

        const row = {
            id: columns[0],
            declarationKind: columns[1],
            originalDeclarantId: parseInt(columns[2], 10),
            name: columns[3]
        };

        return row;
    });

    return rows;
};

// Sample usage
const filePath = path.join(__dirname, 'id_declarantId_mapping.csv');
const parsedData = parseCSV(filePath);

const declarants = {};
parsedData.forEach(declarationData => {
    const {
        id,
        declarationKind,
        originalDeclarantId,
        name
    } = declarationData;

    if (!declarants[originalDeclarantId]) {
        declarants[originalDeclarantId] = [];
    }

    declarants[originalDeclarantId].push(
        {
            declarationId: id,
            declarationKind,
            name
        });
});

// console.log(declarants);

fs.writeFileSync(path.join(__dirname, 'declarationsByDeclarant.json'), JSON.stringify(declarants, null, 4));
