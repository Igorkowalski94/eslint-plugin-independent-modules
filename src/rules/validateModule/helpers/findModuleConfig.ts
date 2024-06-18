import micromatch from "micromatch";

import { Config, Module } from "../validateModule.types";

export const findModuleConfig = (
    fileName: string,
    config: Config,
): Module | undefined =>
    config.modules.find(({ pattern }) => micromatch.isMatch(fileName, pattern));
