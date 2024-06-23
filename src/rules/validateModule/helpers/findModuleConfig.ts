import micromatch from "micromatch";

import { Config, Module } from "../validateModule.types";

export const findModuleConfig = (
    fileName: string,
    modules: Config["modules"],
): Module | undefined =>
    modules.find(({ pattern }) => micromatch.isMatch(fileName, pattern));
