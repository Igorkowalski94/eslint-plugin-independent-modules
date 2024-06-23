import { sep } from "path";

export const convertToSystemSep = (value: string): string =>
    value.replace(/\//g, sep);
