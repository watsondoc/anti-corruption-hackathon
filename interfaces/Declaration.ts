export interface Declaration {
    id: string;
    name: string;
    declarant: string;
    declarantType: string;
    institutionGroup: string;
    institution: string;
    position: string;
    submissionDate: string;
    type: string;
    year: number;
    defails: Defails;
}

export interface Defails {
    id: string;
    name: string;
    preHeader: null;
    header: string;
    content: Content[];
}

export interface Content {
    title: string;
    grids: Grid[];
    empty: boolean;
}

export interface Grid {
    title: string;
    category: string;
    instanceId?: number;
    rows: Row[];
    empty: boolean;
}

export interface Row {
    cells: Cell[];
    empty: boolean;
}

export interface Cell {
    type: Type;
    title: string;
    value: ValueClass | string;
    properties: Properties;
}

export interface Properties {
    type: Type;
    xs: number;
    s: number;
    m: number;
}

export enum Type {
    String = "STRING",
    Table = "TABLE",
}

export interface ValueClass {
    headerItems: HeaderItem[];
    rows: Array<string[]>;
    footerItems: FooterItem[];
}

export interface FooterItem {
    value: string;
    colSpan: number;
}

export interface HeaderItem {
    name: string;
    isNumbering: boolean;
    colSpan: number;
}
