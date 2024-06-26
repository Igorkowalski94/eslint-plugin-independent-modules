import { FinalError } from "./FinalError";

export const getInvalidReusableImportPatternsKeyError = (key: string): Error =>
    new FinalError(
        `🔥 The '${key}' key does not exist in the reusableImportPatterns object. 🔥`,
    );
