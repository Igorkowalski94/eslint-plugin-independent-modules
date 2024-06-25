import fs from "fs";

import { convertToSystemSep } from "./convertToSystemSep";
import { getFullImportPathExternal } from "./getFullImportPathExternal";
import { FILE_EXTENSIONS } from "../validateModule.consts";
import { Config } from "../validateModule.types";

interface AddExtensionToImportPathProps {
    importPath: string;
    cwdWithRoot: string;
    extensions: Config["extensions"];
    cwd: string;
}

export const addExtensionToImportPath = ({
    importPath,
    cwdWithRoot,
    extensions = [],
    cwd,
}: AddExtensionToImportPathProps): string => {
    const allExtensions = [...FILE_EXTENSIONS, ...extensions];

    const isImportPathWithExtension = allExtensions.some((extension) =>
        importPath.endsWith(extension),
    );

    if (isImportPathWithExtension) return importPath;

    const importPathWithSystemSep = convertToSystemSep(importPath);

    const fullImportPath = cwdWithRoot + importPathWithSystemSep;
    const fullImportPathExternal = getFullImportPathExternal(importPath, cwd);

    let foundExtension = "";

    for (const extension of allExtensions) {
        if (
            fs.existsSync(fullImportPath + extension) ||
            fs.existsSync(fullImportPathExternal + extension)
        ) {
            foundExtension = extension;
            break;
        }
    }

    return importPath + foundExtension;
};
