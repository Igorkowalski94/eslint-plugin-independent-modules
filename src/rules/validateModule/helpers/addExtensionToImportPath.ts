import fs from "fs";
import path from "path";

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

    const fullImportPath = path.join(cwdWithRoot, importPath);
    const fullImportPathIndex = path.join(fullImportPath, "index");

    const importPathWithExtension = allExtensions.reduce<string | undefined>(
        (acc, ext) => {
            const isPathWithIndex = fs.existsSync(fullImportPathIndex + ext);
            if (isPathWithIndex) return (acc = `${importPath}/index${ext}`);

            const isPathWithoutIndex = fs.existsSync(fullImportPath + ext);
            if (isPathWithoutIndex) return (acc = importPath + ext);

            return acc;
        },
        undefined,
    );

    return importPathWithExtension ?? importPath;
};
