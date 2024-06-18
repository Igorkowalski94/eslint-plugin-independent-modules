import { sep } from "path";

import { addExtensionToImportPath } from "./addExtensionToImportPath";
import { checkImportPath } from "./checkImportPath";
import { convertImportPathToNonRelative } from "./convertImportPathToNonRelative";
import { readConfigFile } from "./readConfigFile";
import { getInvalidConfigFileError } from "../errors/getInvalidConfigFileError";

interface ValidateAllProps {
    filename: string;
    importPath: string;
    cwd: string;
    configPath: string;
}

export const validateAll = ({
    filename,
    importPath,
    cwd,
    configPath,
}: ValidateAllProps): void => {
    const config = readConfigFile(configPath);

    if (!config || typeof config !== "object" || Array.isArray(config))
        throw getInvalidConfigFileError(configPath);

    const currentRoot = config?.root ?? "src";

    const cwdWithRoot = `${cwd}${sep}${currentRoot}${sep}`;

    const filenameWithoutCwdWithRoot = filename
        .replace(cwdWithRoot, "")
        .replace(/\\/g, "/");

    const newImportPath = importPath
        .replace(cwdWithRoot, "")
        .replace(/\\/g, "/");

    const importPathNonRelative = convertImportPathToNonRelative({
        importPath: newImportPath,
        filename,
        cwdWithRoot,
    });

    const importPathWithExtension = addExtensionToImportPath({
        importPath: importPathNonRelative,
        cwdWithRoot,
    });

    checkImportPath({
        importPath: importPathWithExtension,
        filename: filenameWithoutCwdWithRoot,
        config,
        cwd,
    });
};
