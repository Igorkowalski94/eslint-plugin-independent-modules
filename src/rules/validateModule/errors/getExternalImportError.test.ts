import { FinalError } from "./FinalError";
import { getExternalImportError } from "./getExternalImportError";

describe("getExternalImportError", () => {
    test.each([
        {
            customError: "custom error",
            expected: new FinalError("custom error"),
        },
        {
            customError: undefined,
            expected: new FinalError(
                `🔥 External imports are not allowed in the module 'module'. 🔥`,
            ),
        },
    ])("Should return correct value for %s", ({ customError, expected }) => {
        expect(getExternalImportError("module", customError)).toEqual(expected);
    });
});
