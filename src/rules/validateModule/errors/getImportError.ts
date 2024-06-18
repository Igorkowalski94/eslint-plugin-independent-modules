import { FinalError } from "./FinalError/FinalError";

export const getImportError = (
    moduleName: string,
    customError?: string,
): FinalError =>
    new FinalError(
        customError ??
            `🔥 This import is not allowed in the module '${moduleName}'`,
    );
