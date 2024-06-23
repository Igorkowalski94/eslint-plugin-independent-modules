import { getInvalidReusableImportPatternsKeyError } from "../errors/getInvalidReusableImportPatternsKeyError";
import { Config, Pattern } from "../validateModule.types";

export const extractReusableImportPatterns = (
    patterns: Pattern[],
    reusableImportPatterns: Config["reusableImportPatterns"],
): Pattern[] => {
    if (!reusableImportPatterns) return patterns;

    return patterns.reduce<Pattern[]>((acc, pattern) => {
        if (Array.isArray(pattern))
            return [
                ...acc,
                extractReusableImportPatterns(
                    pattern,
                    reusableImportPatterns,
                ).flat(),
            ];

        const reusableImportPatternKey = pattern.match(/^\{(.*)\}$/)?.[1];

        if (!reusableImportPatternKey) return [...acc, pattern];

        if (!reusableImportPatterns[reusableImportPatternKey])
            throw getInvalidReusableImportPatternsKeyError(
                reusableImportPatternKey,
            );

        return [...acc, ...reusableImportPatterns[reusableImportPatternKey]];
    }, []);
};
