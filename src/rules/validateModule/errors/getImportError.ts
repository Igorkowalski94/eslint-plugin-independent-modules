import { FinalError } from "./FinalError";
import { getDebugMessage } from "../helpers/getDebugMessage";
import { Module } from "../validateModule.types";

interface GetImportErrorProps {
    moduleName: string;
    errorMessage?: string;
    debugMode?: boolean;
    importPath: string;
    filename: string;
    allowImportsFromExtracted: Module["allowImportsFrom"];
}

export const getImportError = ({
    allowImportsFromExtracted,
    filename,
    importPath,
    moduleName,
    debugMode,
    errorMessage,
}: GetImportErrorProps): FinalError => {
    const debugModeMessage = debugMode
        ? getDebugMessage({ allowImportsFromExtracted, filename, importPath })
        : "";

    return new FinalError(
        (errorMessage ??
            `🔥 This import is not allowed in the module '${moduleName}'. 🔥`) +
            debugModeMessage,
    );
};
