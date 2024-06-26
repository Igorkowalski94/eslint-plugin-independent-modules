import { extractReferencesFromPattern } from "./extractReferencesFromPattern";

export const getLvlFromPattern = (
    pattern: string,
    defaultLvl: number,
): number => {
    const extractedReference = extractReferencesFromPattern(pattern);

    if (!extractedReference) return defaultLvl;

    const patternElements = extractedReference.split("_");

    if (patternElements.length === 1) return defaultLvl;

    return Number(patternElements[1].replace("}", ""));
};
