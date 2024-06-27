import fs from "fs";

import { getFullImportPathVariants } from "./getFullImportPathVariants";

export const isExternalImport = (importPath: string, cwd: string): boolean => {
    const { fullImportPathExternal, fullImportPathExternalTypes } =
        getFullImportPathVariants({ importPath, cwd, cwdWithRoot: "" });

    return (
        fs.existsSync(fullImportPathExternal) ||
        fs.existsSync(fullImportPathExternalTypes)
    );
};
