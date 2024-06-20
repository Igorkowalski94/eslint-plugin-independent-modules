export const getLvlFromPattern = (
    pattern: string,
    defaultLvl: number,
): number => {
    const patternElements = pattern.split("_");

    if (patternElements.length === 1) return defaultLvl;

    return Number(patternElements[1].replace("}", ""));
};
