import micromatch from "micromatch";

import { convertReferencesToPath } from "./convertReferencesToPath";
import { Pattern } from "../validateModule.types";

interface ValidateImportPathProps {
    allowImportsFrom: Pattern[];
    importPath: string;
    filename: string;
}

export const validateImportPath = ({
    allowImportsFrom,
    importPath,
    filename,
}: ValidateImportPathProps): boolean =>
    allowImportsFrom.some((pattern) => {
        const newPattern = convertReferencesToPath({
            pattern,
            importPath,
            filename,
        });

        return micromatch.every(importPath, newPattern);
    });
