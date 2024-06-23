import { sep } from "path";

import { DEFAULT_ROOT } from "../validateModule.consts";
import { Config } from "../validateModule.types";

export const getCwdWithRoot = (cwd: string, root: Config["root"]): string => {
    if (root === null) return `${cwd}${sep}`;

    return `${cwd}${sep}${root ?? DEFAULT_ROOT}${sep}`;
};
