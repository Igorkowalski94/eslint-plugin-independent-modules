import { FinalError } from "./FinalError";
import { getImportError } from "./getImportError";

describe("getImportError", () => {
    test.each([
        {
            customError: "custom error",
            expected: new FinalError("custom error"),
        },
        {
            customError: undefined,
            expected: new FinalError(
                `🔥 This import is not allowed in the module 'module'. 🔥`,
            ),
        },
    ])("Should return correct value for %s", ({ customError, expected }) => {
        expect(getImportError("module", customError)).toEqual(expected);
    });
});
