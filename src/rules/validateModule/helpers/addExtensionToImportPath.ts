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

    const pathWithIndex = [
        fullImportPathIndex,
        fullImportPathExternalIndex,
        fullImportPathExternalTypesIndex,
    ];

    const pathWithoutIndex = [
        fullImportPath,
        fullImportPathExternal,
        fullImportPathExternalTypes,
    ];

    const importPathWithExtension = allExtensions.reduce<string | undefined>(
        (acc, ext) => {
            const isPathWithoutIndex = pathWithoutIndex.some((path) =>
                fs.existsSync(path + ext),
            );
            if (isPathWithoutIndex) return (acc = importPath + ext);

            const isPathWithIndex = pathWithIndex.some((path) =>
                fs.existsSync(path + ext),
            );
            if (isPathWithIndex) return (acc = `${importPath}/index${ext}`);

            return acc;
        },
        undefined,
    );

    return importPathWithExtension ?? importPath;
};
