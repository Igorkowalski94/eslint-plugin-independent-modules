export const getFamilyPath = (importPath: string, filename: string): string => {
    const importPathParts = importPath.split("/");
    const filenameParts = filename.split("/");

    const familyParts = [];

    for (
        let i = 0;
        i < Math.min(importPathParts.length, filenameParts.length);
        i++
    ) {
        if (importPathParts[i] !== filenameParts[i]) break;

        familyParts.push(importPathParts[i]);
    }

    return familyParts.join("/");
};
