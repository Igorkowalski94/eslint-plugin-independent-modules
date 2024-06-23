import { addExtensionToImportPath } from "./addExtensionToImportPath";

jest.mock("fs", () => ({
    existsSync: jest.fn((path) =>
        path ===
        "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature1.testExt"
            ? true
            : false,
    ),
}));

describe("addExtensionToImportPath", () => {
    test.each([
        {
            importPath: "features/Feature1",
            cwdWithRoot: "C:\\Users\\user\\Desktop\\repo\\src\\",
            extensions: [".testExt"],
            expected: "features/Feature1.testExt",
        },
        {
            importPath: "features/Feature1.tsx",
            cwdWithRoot: "C:\\Users\\user\\Desktop\\repo\\src\\",
            extensions: undefined,
            expected: "features/Feature1.tsx",
        },
        {
            importPath: "features/Feature2",
            cwdWithRoot: "C:\\Users\\user\\Desktop\\repo\\src\\",
            extensions: undefined,
            expected: "features/Feature2",
        },
    ])(
        "Should return correct value for %s",
        ({ importPath, cwdWithRoot, extensions, expected }) => {
            expect(
                addExtensionToImportPath({
                    importPath,
                    cwdWithRoot,
                    extensions,
                }),
            ).toEqual(expected);
        },
    );
});
