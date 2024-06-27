import { getDirnamePath } from "./getDirnamePath";
import { getFamilyPath } from "./getFamilyPath";
import { Module } from "../validateModule.types";

interface GetDebugMessageProps {
    allowImportsFromExtracted: Module["allowImportsFrom"];
    filename: string;
    importPath: string;
}

export const getDebugMessage = ({
    allowImportsFromExtracted,
    filename,
    importPath,
}: GetDebugMessageProps): string => {
    const referencesMode = allowImportsFromExtracted.reduce(
        (acc, ref) => (acc = `${acc}${JSON.stringify(ref)}\n`),
        "\nallowImportsFrom:\n",
    );

    return `\n\nFile path   = "${filename}"\nImport path = "${importPath}"\n{family}    = "${getFamilyPath({ filename, importPath, pattern: "{family}" })}"\n{dirname}   = "${getDirnamePath(filename, "{dirname}")}"\n${referencesMode}`;
};
