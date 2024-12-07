export const HOME = { label: "Home", href: "/" };
export const DECLARATIONS = { label: "Declarations", href: "/declarations"  };
export const declaration = (id: string, label: string) => ({ label, href: `/declarations/${id}` });