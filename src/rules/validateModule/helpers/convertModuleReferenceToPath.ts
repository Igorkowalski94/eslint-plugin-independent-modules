import { FAMILY_REFERENCE, MODULE_REFERENCE } from "../validateModule.consts";
import { Pattern } from "../validateModule.types";

interface ConvertModuleReferenceToPathProps {
    pattern: Pattern;
    modulePath: string;
    familyPath: string;
}

export const convertModuleReferenceToPath = ({
    familyPath,
    modulePath,
    pattern,
}: ConvertModuleReferenceToPathProps): Pattern =>
    Array.isArray(pattern)
        ? pattern
              .map((p) => p.replace(MODULE_REFERENCE, modulePath))
              .map((p) => p.replace(FAMILY_REFERENCE, familyPath))
        : pattern
              .replace(MODULE_REFERENCE, modulePath)
              .replace(FAMILY_REFERENCE, familyPath);
