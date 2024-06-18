import { extractReusableImportPatterns } from "./extractReusableImportPatterns";
import { findModuleConfig } from "./findModuleConfig";
import { getFamilyPath } from "./getFamilyPath";
import { getModulePath } from "./getModulePath";
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
    config,
    cwd,
}: CheckImportPathProps): void => {
    const moduleConfig = findModuleConfig(filename, config);

    if (!moduleConfig) return;

    const {
        allowExternalImports,
        allowImportsFrom,
        name: moduleName,
        errorMessage,
    } = moduleConfig;

    const allowImportsFromExtracted = extractReusableImportPatterns(
        allowImportsFrom,
        config,
    );

    const isExternal = isExternalImport(importPath, cwd);

    if (
        isExternal &&
        allowExternalImports === false &&
        !allowImportsFromExtracted.includes(importPath)
    )
        throw getExternalImportError(moduleName, errorMessage);

    const modulePath = getModulePath(filename);
    const familyPath = getFamilyPath(importPath, filename);

    const isValidImportPath = validateImportPath({
        allowImportsFrom: allowImportsFromExtracted,
        importPath,
        modulePath,
        familyPath,
    });

    if (isValidImportPath) return;

    throw getImportError(moduleName, errorMessage);
};
