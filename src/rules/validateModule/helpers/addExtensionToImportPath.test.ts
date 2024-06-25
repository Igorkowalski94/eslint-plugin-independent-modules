import { addExtensionToImportPath } from "./addExtensionToImportPath";

jest.mock("path", () => ({ sep: "\\" }));

jest.mock("fs", () => ({
    existsSync: jest.fn((path) => {
        if (
            path ===
            "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature1.testExt"
        ) {
            return true;
        }

        if (
            path ===
            "C:\\Users\\user\\Desktop\\repo\\node_modules\\react\\test.testExt"
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
            expected: "features/Feature2",
        },
        {
            importPath: "react/test",
            extensions: [".testExt"],
            expected: "react/test.testExt",
        },
    ])(
        "Should return correct value for %s",
        ({ importPath, extensions, expected }) => {
            expect(
                addExtensionToImportPath({
                    importPath,
                    cwdWithRoot: "C:\\Users\\user\\Desktop\\repo\\src\\",
                    extensions,
                    cwd: "C:\\Users\\user\\Desktop\\repo",
                }),
            ).toEqual(expected);
        },
    );
});
