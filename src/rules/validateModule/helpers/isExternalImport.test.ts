import fs from "fs";

import { isExternalImport } from "./isExternalImport";

jest.mock("path", () => ({ ...jest.requireActual("path"), sep: "\\" }));

describe("isExternalImport", () => {
    it("should return true if import is external", () => {
        jest.spyOn(fs, "existsSync").mockImplementation(
            (path) =>
                path === "C:\\Users\\user\\Desktop\\repo\\node_modules\\react",
        );
        expect(
            isExternalImport("react", "C:\\Users\\user\\Desktop\\repo"),
        ).toEqual(true);
    });

    it("should return true if import is external from @types", () => {
        jest.spyOn(fs, "existsSync").mockImplementation(
            (path) =>
                path ===
                "C:\\Users\\user\\Desktop\\repo\\node_modules\\@types\\react",
        );
        expect(
            isExternalImport("react", "C:\\Users\\user\\Desktop\\repo"),
        ).toEqual(true);
    });

    it("should return false if import is not external", () => {
        jest.spyOn(fs, "existsSync").mockImplementation(() => false);
        expect(
            isExternalImport(
                "features/feature1",
                "C:\\Users\\user\\Desktop\\repo",
            ),
        ).toEqual(false);
    });
});
