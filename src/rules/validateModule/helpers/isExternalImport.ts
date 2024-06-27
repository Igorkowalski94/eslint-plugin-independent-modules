import fs from "fs";
import path from "path";

export const isExternalImport = (importPath: string, cwd: string): boolean => {
    const fullImportPathExternal = path.join(cwd, "node_modules", importPath);
    const fullImportPathExternalTypes = path.join(
        cwd,
        "node_modules",
        "@types",
        importPath,
    );

    return (
        fs.existsSync(fullImportPathExternal) ||
        fs.existsSync(fullImportPathExternalTypes)
    );
};
