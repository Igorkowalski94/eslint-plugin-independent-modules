import { getInvalidReusableImportPatternsKeyError } from "../errors/getInvalidReusableImportPatternsKeyError";
import { getRecursionLimitError } from "../errors/getRecursionLimitError";
import { Config, Pattern } from "../validateModule.types";

interface ExtractReusableImportPatternsProps {
    patterns: Pattern[];
    reusableImportPatterns: Config["reusableImportPatterns"];
    recursionLimit?: number;
}

export const extractReusableImportPatterns = ({
    patterns,
    reusableImportPatterns,
    recursionLimit = 1000,
}: ExtractReusableImportPatternsProps): Pattern[] => {
    if (!reusableImportPatterns) return patterns;

    if (recursionLimit === 0) throw getRecursionLimitError(patterns);

    return patterns.reduce<Pattern[]>((acc, pattern) => {
        if (Array.isArray(pattern))
            return [
                ...acc,
                extractReusableImportPatterns({
                    patterns: pattern,
                    reusableImportPatterns,
                    recursionLimit: recursionLimit - 1,
                }).flat(),
            ];

        const reusableImportPatternKey = pattern.match(/^\{(.*)\}$/)?.[1];

        if (!reusableImportPatternKey) return [...acc, pattern];

        if (!reusableImportPatterns[reusableImportPatternKey])
            throw getInvalidReusableImportPatternsKeyError(
                reusableImportPatternKey,
            );

        return [
            ...acc,
            ...extractReusableImportPatterns({
                patterns: reusableImportPatterns[reusableImportPatternKey],
                reusableImportPatterns,
                recursionLimit: recursionLimit - 1,
            }),
        ];
    }, []);
};
