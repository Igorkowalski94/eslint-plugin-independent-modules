import { FinalError } from "./FinalError/FinalError";

export const getExternalImportError = (
    moduleName: string,
    errorMessage?: string,
): FinalError =>
    new FinalError(
        errorMessage ??
            `🔥 External imports are not allowed in the module '${moduleName}'`,
    );
