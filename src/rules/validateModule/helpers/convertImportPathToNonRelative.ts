import path from "path";

interface ConvertImportPathToNonRelativeProps {
    importPath: string;
    filename: string;
    cwdWithRoot: string;
}

export const convertImportPathToNonRelative = ({
    cwdWithRoot,
    filename,
    importPath,
}: ConvertImportPathToNonRelativeProps): string => {
    if (!importPath.startsWith(".")) return importPath;

    const dirname = path.dirname(filename);

    const fullImportPath = path.resolve(dirname, importPath);

    const importPathNonRelative = fullImportPath
        .replace(cwdWithRoot, "")
        .replace(/\\/g, "/");

    return importPathNonRelative;
};
