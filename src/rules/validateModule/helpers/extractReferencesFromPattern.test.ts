import { extractReferencesFromPattern } from "./extractReferencesFromPattern";

describe("extractReferencesFromPattern", () => {
    test.each([
        {
            pattern: "test{family}/*.tsx",
            expected: "{family}",
        },
        {
            pattern: "{family_3}/*.tsx",
            expected: "{family_3}",
        },
        {
            pattern: "test{dirname}/*.tsx",
            expected: "{dirname}",
        },
        {
            pattern: "{dirname_3}/*.tsx",
            expected: "{dirname_3}",
        },
        {
            pattern: "error",
            expected: null,
        },
    ])("Should return correct value for %s", ({ pattern, expected }) => {
        expect(extractReferencesFromPattern(pattern)).toEqual(expected);
    });
});
