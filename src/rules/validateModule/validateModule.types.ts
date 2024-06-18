export type Pattern = string | string[];

export interface Module {
    name: string;
    pattern: string;
    errorMessage?: string;
    allowImportsFrom: Pattern[];
    allowExternalImports?: boolean;
}

export interface Config {
    root?: string;
    reusableImportPatterns: Record<string, Pattern[]>;
    modules: Module[];
}
