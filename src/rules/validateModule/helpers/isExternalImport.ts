import fs from "fs";
import { sep } from "path";

export const isExternalImport = (importPath: string, cwd: string): boolean => {
    const importPathWithSystemSep = importPath.replace(/(\/)/g, sep);

    const nodePath = `${cwd}${sep}node_modules${sep}${importPathWithSystemSep}`;

    return fs.existsSync(nodePath);
};
