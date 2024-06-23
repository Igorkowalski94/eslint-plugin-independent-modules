import path from "path";

import { convertToSystemSep } from "./convertToSystemSep";
import { removeCwdWithRootAndUnifySep } from "./removeCwdWithRootAndUnifySep";

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

    const importPathWithSystemSep = convertToSystemSep(importPath);

    const fullImportPath = path.resolve(dirname, importPathWithSystemSep);

    return removeCwdWithRootAndUnifySep(fullImportPath, cwdWithRoot);
};
