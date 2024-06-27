import path from "path";

import { addExtensionToImportPath } from "./addExtensionToImportPath";

jest.mock("fs", () => ({
    existsSync: jest.fn((path) => {
        if (
            path ===
            "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature2\\index.ts"
        ) {
            return true;
        }

        if (
            path ===
            "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature1.testExt"
        ) {
            return true;
        }

        return false;
    }),
}));

describe("addExtensionToImportPath", () => {
    test.each([
        {
            importPath: "features/Feature1",
            extensions: [".testExt"],
            expected: "features/Feature1.testExt",
        },
        {
            importPath: "features/Feature1.tsx",
            extensions: undefined,
            expected: "features/Feature1.tsx",
        },
        {
            importPath: "features/Feature2",
            extensions: undefined,
            expected: "features/Feature2/index.ts",
        },
        {
            importPath: "react",
            extensions: undefined,
            expected: "react",
        },
        {
            importPath: "styled-components/macro",
            extensions: undefined,
            expected: "styled-components/macro",
        },
    ])(
        "Should return correct value for %s",
        ({ importPath, extensions, expected }) => {
            jest.spyOn(path, "join")
                .mockImplementationOnce(
                    () =>
                        `C:\\Users\\user\\Desktop\\repo\\src\\${importPath.replaceAll("/", "\\")}`,
                )
                .mockImplementationOnce(
                    () =>
                        `C:\\Users\\user\\Desktop\\repo\\src\\${importPath.replaceAll("/", "\\")}\\index`,
                );

            expect(
                addExtensionToImportPath({
                    importPath,
                    cwdWithRoot: "C:\\Users\\user\\Desktop\\repo\\src\\",
                    extensions,
                }),
            ).toEqual(expected);

            jest.restoreAllMocks();
        },
    );
});
