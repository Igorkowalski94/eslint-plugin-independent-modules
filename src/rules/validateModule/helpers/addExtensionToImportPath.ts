import fs from "fs";

import { FILE_EXTENSIONS } from "../validateModule.consts";
import { Config } from "../validateModule.types";

interface AddExtensionToImportPathProps {
    importPath: string;
    cwdWithRoot: string;
    extensions: Config["extensions"];
}

export const addExtensionToImportPath = ({
    importPath,
    cwdWithRoot,
    extensions = [],
}: AddExtensionToImportPathProps): string => {
    const allExtensions = [...FILE_EXTENSIONS, ...extensions];

    const isImportPathWithExtension = allExtensions.some((extension) =>
        importPath.endsWith(extension),
    );

    if (isImportPathWithExtension) return importPath;

    const fullImportPath = cwdWithRoot + importPath;

    let foundExtension = "";

    for (const extension of allExtensions) {
        if (fs.existsSync(fullImportPath + extension)) {
            foundExtension = extension;
            break;
        }
    }

    return importPath + foundExtension;
};
