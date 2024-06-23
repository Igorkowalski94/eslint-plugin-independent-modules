import { readConfigFile } from "./readConfigFile";
import { validateAll } from "./validateAll";
import { getInvalidConfigFileError } from "../errors/getInvalidConfigFileError";

jest.mock("./readConfigFile", () => ({
    readConfigFile: jest.fn(),
}));

describe("validateAll", () => {
    test("Should not throw getInvalidConfigFileError when config is correct", () => {
        (readConfigFile as jest.Mock).mockReturnValue({});

        expect(() =>
            validateAll({
                configPath: "./config",
                cwd: "../",
                filename: "fileName",
                importPath: "importPath",
            }),
        ).not.toThrow(getInvalidConfigFileError("./config"));
    });

    test.each([undefined, [], ""])(
        "Should throw getInvalidConfigFileError when config is %s",
        (value) => {
            (readConfigFile as jest.Mock).mockReturnValue(value);

            expect(() =>
                validateAll({
                    configPath: "./config",
                    cwd: "../",
                    filename: "fileName",
                    importPath: "importPath",
                }),
            ).toThrow(getInvalidConfigFileError("./config"));
        },
    );
});
