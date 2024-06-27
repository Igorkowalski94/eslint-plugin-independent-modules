import path from "path";

interface GetFullImportPathVariantsProps {
    importPath: string;
    cwdWithRoot: string;
    cwd: string;
}

interface GetFullImportPathVariantsReturn {
    fullImportPath: string;
    fullImportPathIndex: string;

    fullImportPathExternal: string;
    fullImportPathExternalIndex: string;

    fullImportPathExternalTypes: string;
    fullImportPathExternalTypesIndex: string;
}

export const getFullImportPathVariants = ({
    importPath,
    cwdWithRoot,
    cwd,
}: GetFullImportPathVariantsProps): GetFullImportPathVariantsReturn => {
    const fullImportPath = path.join(cwdWithRoot, importPath);
    const fullImportPathIndex = path.join(fullImportPath, "index");

    const fullImportPathExternal = path.join(cwd, "node_modules", importPath);
    const fullImportPathExternalIndex = path.join(
        fullImportPathExternal,
        "index",
    );

    const fullImportPathExternalTypes = path.join(
        cwd,
        "node_modules",
        "@types",
        importPath,
    );
    const fullImportPathExternalTypesIndex = path.join(
        fullImportPathExternalTypes,
        "index",
    );

    return {
        fullImportPath,
        fullImportPathIndex,
        fullImportPathExternal,
        fullImportPathExternalIndex,
        fullImportPathExternalTypes,
        fullImportPathExternalTypesIndex,
    };
};
