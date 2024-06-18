import path from "path";

export const getModulePath = (fileName: string): string =>
    path.dirname(fileName);
