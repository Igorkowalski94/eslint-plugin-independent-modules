import { sep } from "path";

export const removeCwdWithRootAndUnifySep = (
    path: string,
    cwdWithRoot: string,
): string => path.replace(cwdWithRoot, "").replace(/\\/g, sep);
