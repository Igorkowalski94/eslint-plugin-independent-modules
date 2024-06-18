import { Config, Pattern } from "../validateModule.types";

export const extractReusableImportPatterns = (
    patterns: Pattern[],
    config: Config,
): Pattern[] =>
    patterns
        .map((pattern) => {
            if (Array.isArray(pattern)) return pattern;

            const reusableImportPatternKey = pattern.match(/^\{(.*)\}$/)?.[1];

            if (!reusableImportPatternKey) return pattern;

            return config.reusableImportPatterns[reusableImportPatternKey];
        })
        .flat();
