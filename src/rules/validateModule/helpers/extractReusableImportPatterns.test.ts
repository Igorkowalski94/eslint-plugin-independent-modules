import { extractReusableImportPatterns } from "./extractReusableImportPatterns";
import { getInvalidReusableImportPatternsKeyError } from "../errors/getInvalidReusableImportPatternsKeyError";
import { getRecursionLimitError } from "../errors/getRecursionLimitError";
import { Config } from "../validateModule.types";

describe("extractReusableImportPatterns", () => {
    const reusableImportPatterns: Config["reusableImportPatterns"] = {
        notPrivateFilesAndFolders: [
            "!(**/*.(types|consts|test|api|context|stories).(ts|tsx))",
            "!(**/(hooks|helpers|c)/**)",
        ],
        globalHooks: [["hooks/**", "{notPrivateFilesAndFolders}"]],
        pattern1: ["{pattern2}"],
        pattern2: ["{pattern1}"],
    };

    test("Should return correct patterns when reusableImportPatterns keys exist", () => {
        expect(
            extractReusableImportPatterns({
                patterns: ["{globalHooks}", ["{globalHooks}"]],
                reusableImportPatterns,
            }),
        ).toEqual([
            [
                "hooks/**",
                "!(**/*.(types|consts|test|api|context|stories).(ts|tsx))",
                "!(**/(hooks|helpers|c)/**)",
            ],
            [
                "hooks/**",
                "!(**/*.(types|consts|test|api|context|stories).(ts|tsx))",
                "!(**/(hooks|helpers|c)/**)",
            ],
        ]);
    });

    test("Should throw recursion error", () => {
        expect(() =>
            extractReusableImportPatterns({
                patterns: ["{pattern1}"],
                reusableImportPatterns,
            }),
        ).toThrow(getRecursionLimitError(["{pattern1}"]));
    });

    test("Should return patterns when reusableImportPatterns === undefined", () => {
        expect(
            extractReusableImportPatterns({
                patterns: ["test/**"],
                reusableImportPatterns: undefined,
            }),
        ).toEqual(["test/**"]);
    });

    test("Should return error when reusableImportPatterns keys do not exist", () => {
        expect(() =>
            extractReusableImportPatterns({
                patterns: ["{pattern3}"],
                reusableImportPatterns,
            }),
        ).toThrow(getInvalidReusableImportPatternsKeyError("pattern3"));
    });
});
