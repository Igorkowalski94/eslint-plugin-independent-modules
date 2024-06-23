import { extractReusableImportPatterns } from "./extractReusableImportPatterns";
import { getInvalidReusableImportPatternsKeyError } from "../errors/getInvalidReusableImportPatternsKeyError";
import { Config } from "../validateModule.types";

describe("extractReusableImportPatterns", () => {
    const reusableImportPatterns: Config["reusableImportPatterns"] = {
        pattern1: ["test/**"],
        pattern2: [["features/**", "!features/**/*.ts"], "helpers/**"],
    };

    test("Should return correct patterns when reusableImportPatterns keys exist", () => {
        expect(
            extractReusableImportPatterns(
                [
                    "{pattern1}",
                    ["{pattern1}"],
                    "src/**",
                    "{pattern2}",
                    ["{pattern2}"],
                ],
                reusableImportPatterns,
            ),
        ).toEqual([
            "test/**",
            ["test/**"],
            "src/**",
            ["features/**", "!features/**/*.ts"],
            "helpers/**",
            ["features/**", "!features/**/*.ts", "helpers/**"],
        ]);
    });

    test("Should return patterns when reusableImportPatterns === undefined", () => {
        expect(extractReusableImportPatterns(["test/**"], undefined)).toEqual([
            "test/**",
        ]);
    });

    test("Should return error when reusableImportPatterns keys do not exist", () => {
        expect(() =>
            extractReusableImportPatterns(
                ["{pattern3}"],
                reusableImportPatterns,
            ),
        ).toThrow(getInvalidReusableImportPatternsKeyError("pattern3"));
    });
});
