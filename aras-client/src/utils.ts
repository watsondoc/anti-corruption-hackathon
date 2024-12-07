
export const getRiskClass = (risk?: number): string | undefined => {
    if (!risk || risk < 0 || risk > 1) {
        return;
    }
    
    const riskType = Math.round(risk * 4);
    if (riskType == 0) {
        return undefined
    }

    return `danger-${riskType}`;
};

export const formatCurrency = (value: number | string): string => {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
};