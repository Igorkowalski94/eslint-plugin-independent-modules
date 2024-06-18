import { Config, Pattern } from "../validateModule.types";

export const extractReusableImportPatterns = (
    patterns: Pattern[],
    config: Config,
): Pattern[] =>
    patterns.slice().reduce<Pattern[]>((acc, pattern) => {
        if (Array.isArray(pattern)) return [...acc, pattern];

        const reusableImportPatternKey = pattern.match(/^\{(.*)\}$/)?.[1];

        if (!reusableImportPatternKey) return [...acc, pattern];

        return [
            ...acc,
            ...config.reusableImportPatterns[reusableImportPatternKey],
        ];
    }, []);
