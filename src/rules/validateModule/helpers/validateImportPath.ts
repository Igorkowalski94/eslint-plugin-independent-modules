import micromatch from "micromatch";

import { convertModuleReferenceToPath } from "./convertModuleReferenceToPath";
import { Pattern } from "../validateModule.types";

interface ValidateImportPathProps {
    allowImportsFrom: Pattern[];
    importPath: string;
    modulePath: string;
    familyPath: string;
}

export const validateImportPath = ({
    allowImportsFrom,
    importPath,
    modulePath,
    familyPath,
}: ValidateImportPathProps): boolean =>
    allowImportsFrom.some((pattern) => {
        const newPattern = convertModuleReferenceToPath({
            pattern,
            modulePath,
            familyPath,
        });

        return micromatch.every(importPath, newPattern);
    });
