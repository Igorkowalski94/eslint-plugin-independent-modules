import fs from "fs";

import { getFullImportPathExternal } from "./getFullImportPathExternal";

export const isExternalImport = (importPath: string, cwd: string): boolean => {
    const fullImportPathExternal = getFullImportPathExternal(importPath, cwd);

    return fs.existsSync(fullImportPathExternal);
};
