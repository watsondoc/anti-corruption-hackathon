export const HOME = { label: "Home", href: "/" };
export const DECLARATIONS = { label: "Declarations", href: "/declarations"  };
export const RISK_INDICATORS = { label: "Risk Indicators", href: "/risk-indicators" };

export const declarant = (id: string, label: string) => ({ label, href: `/declarant/${id}` });