import { FinalError } from "./FinalError";

export const getExternalImportError = (
    moduleName: string,
    errorMessage?: string,
): FinalError =>
    new FinalError(
        errorMessage ??
            `🔥 External imports are not allowed in the module '${moduleName}'. 🔥`,
    );
