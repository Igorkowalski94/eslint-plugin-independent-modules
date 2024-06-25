import micromatch from "micromatch";

import { extractReusableImportPatterns } from "./extractReusableImportPatterns";
import { findModuleConfig } from "./findModuleConfig";
import { isExternalImport } from "./isExternalImport";
import { validateImportPath } from "./validateImportPath";
import { getExternalImportError } from "../errors/getExternalImportError";
import { getImportError } from "../errors/getImportError";
import { Config } from "../validateModule.types";

interface CheckImportPathProps {
    importPath: string;
    filename: string;
    config: Config;
    cwd: string;
}

export const checkImportPath = ({
    importPath,
    filename,
    config: { reusableImportPatterns, modules },
    cwd,
}: CheckImportPathProps): void => {
    const moduleConfig = findModuleConfig(filename, modules);

    if (!moduleConfig) return;

    const {
        allowExternalImports,
        allowImportsFrom,
        name: moduleName,
        errorMessage,
    } = moduleConfig;

    const allowImportsFromExtracted = extractReusableImportPatterns(
        allowImportsFrom,
        reusableImportPatterns,
    );

    const isExternal = isExternalImport(importPath, cwd);

    if (isExternal) {
        const isValidExternalImportPattern = allowImportsFromExtracted.some(
            (p) => micromatch.every(importPath, p),
        );

        if (isValidExternalImportPattern || allowExternalImports !== false)
            return;

        throw getExternalImportError(moduleName, errorMessage);
    }

    const isValidImportPath = validateImportPath({
        allowImportsFrom: allowImportsFromExtracted,
        importPath,
        filename,
    });

    if (isValidImportPath) return;

    throw getImportError(moduleName, errorMessage);
};
