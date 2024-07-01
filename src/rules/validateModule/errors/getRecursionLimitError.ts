import { FinalError } from "./FinalError";
import { Pattern } from "../validateModule.types";

export const getRecursionLimitError = (pattern: Pattern[]): Error =>
    new FinalError(
        `🔥 Recursion limit for pattern: ${JSON.stringify(pattern)} 🔥`,
    );
