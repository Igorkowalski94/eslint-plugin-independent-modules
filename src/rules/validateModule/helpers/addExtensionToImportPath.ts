import fs from "fs";

import { FILE_EXTENSIONS } from "../validateModule.consts";

interface AddExtensionToImportPathProps {
    importPath: string;
    cwdWithRoot: string;
}

export const addExtensionToImportPath = ({
    importPath,
    cwdWithRoot,
}: AddExtensionToImportPathProps): string => {
    const isImportPathWithExtension = FILE_EXTENSIONS.some((extension) =>
        importPath.endsWith(extension),
    );

    if (isImportPathWithExtension) return importPath;

    const fullImportPath = cwdWithRoot + importPath;

    let foundExtension = "";

    for (const extension of FILE_EXTENSIONS) {
        if (fs.existsSync(fullImportPath + extension)) {
            foundExtension = extension;
            break;
        }
    }

    return importPath + foundExtension;
};
