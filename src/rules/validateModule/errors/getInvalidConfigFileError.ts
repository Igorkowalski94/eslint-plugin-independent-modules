import { FinalError } from "./FinalError/FinalError";

export const getInvalidConfigFileError = (configPath: string): Error =>
    new FinalError(`🔥 Invalid configuration file '${configPath}' 🔥`);
