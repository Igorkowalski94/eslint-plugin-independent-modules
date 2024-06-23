import { convertImportPathToNonRelative } from "./convertImportPathToNonRelative";

jest.mock("path", () => ({
    ...(jest.requireActual("path") as typeof import("path")),
    sep: jest.fn(() => "/"),
}));

describe("convertImportPathToNonRelative", () => {
    test.each([
        {
            filename:
                "C:/Users/user/Desktop/repo/src/features/Feature1/feature1.types.ts",
            importPath: "./Feature1.tsx",
            cwdWithRoot: "C:/Users/user/Desktop/repo/src/",
            expected:
                "C:/Users/user/Desktop/repo/src/features/Feature1/Feature1.tsx",
        },
        {
            filename:
                "C:/Users/user/Desktop/repo/src/features/Feature1/feature1.types.ts",
            importPath: "../Feature2.tsx",
            cwdWithRoot: "C:/Users/user/Desktop/repo/src/",
            expected: "C:/Users/user/Desktop/repo/src/features/Feature2.tsx",
        },
        {
            filename:
                "C:/Users/user/Desktop/repo/src/features/Feature1/feature1.types.ts",
            importPath: "../../index.tsx",
            cwdWithRoot: "C:/Users/user/Desktop/repo/src/",
            expected: "C:/Users/user/Desktop/repo/src/index.tsx",
        },
        {
            filename:
                "C:/Users/user/Desktop/repo/src/features/Feature1/feature1.types.ts",
            importPath: "features/Feature1/Feature1.tsx",
            cwdWithRoot: "C:/Users/user/Desktop/repo/src/",
            expected: "features/Feature1/Feature1.tsx",
        },
    ])(
        "Should return correct value for %s",
        ({ filename, importPath, cwdWithRoot, expected }) => {
            expect(
                convertImportPathToNonRelative({
                    filename,
                    importPath,
                    cwdWithRoot,
                }),
            ).toEqual(expected);
        },
    );
});
