import { getDirnamePath } from "./getDirnamePath";
import { getFamilyPath } from "./getFamilyPath";
import { FAMILY_REGEX, DIRNAME_REGEX } from "../validateModule.consts";
import { Pattern } from "../validateModule.types";

interface ConvertModuleReferenceToPathProps {
    pattern: Pattern;
    importPath: string;
    filename: string;
}

export const convertModuleReferenceToPath = ({
    importPath,
    pattern,
    filename,
}: ConvertModuleReferenceToPathProps): Pattern =>
    Array.isArray(pattern)
        ? pattern
              .map((p) => p.replace(DIRNAME_REGEX, getDirnamePath(filename, p)))
              .map((p) =>
                  p.replace(
                      FAMILY_REGEX,
                      getFamilyPath({ importPath, filename, pattern: p }),
                  ),
              )
        : pattern
              .replace(DIRNAME_REGEX, getDirnamePath(filename, pattern))
              .replace(
                  FAMILY_REGEX,
                  getFamilyPath({ importPath, filename, pattern }),
              );
