import fs from "fs";

import { getFullImportPathVariants } from "./getFullImportPathVariants";
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

    const {
        fullImportPath,
        fullImportPathExternal,
        fullImportPathExternalIndex,
        fullImportPathExternalTypes,
        fullImportPathExternalTypesIndex,
        fullImportPathIndex,
    } = getFullImportPathVariants({ importPath, cwdWithRoot, cwd });

    const fullImportPathsWithIndex = [
        fullImportPathIndex,
        fullImportPathExternalIndex,
        fullImportPathExternalTypesIndex,
    ];

    const fullImportPathsWithoutIndex = [
        fullImportPath,
        fullImportPathExternal,
        fullImportPathExternalTypes,
    ];

    const importPathWithExtension = allExtensions.reduce<string | undefined>(
        (acc, ext) => {
            const isImportPathWithoutIndex = fullImportPathsWithoutIndex.some(
                (fullImportPathWithoutIndex) =>
                    fs.existsSync(fullImportPathWithoutIndex + ext),
            );
            if (isImportPathWithoutIndex) return (acc = importPath + ext);

            const isImportPathWithIndex = fullImportPathsWithIndex.some(
                (fullImportPathWithIndex) =>
                    fs.existsSync(fullImportPathWithIndex + ext),
            );
            if (isImportPathWithIndex)
                return (acc = `${importPath}/index${ext}`);

            return acc;
        },
        undefined,
    );

    return importPathWithExtension ?? importPath;
};
