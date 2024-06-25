import { sep } from "path";

import { convertToSystemSep } from "./convertToSystemSep";

export const getFullImportPathExternal = (
    importPath: string,
    cwd: string,
): string => {
    const importPathWithSystemSep = convertToSystemSep(importPath);

    return `${cwd}${sep}node_modules${sep}${importPathWithSystemSep}`;
};
