import { sep } from "path";

import { TSESTree } from "@typescript-eslint/utils";
import { ReportDescriptor } from "@typescript-eslint/utils/dist/ts-eslint/Rule";

import { validateAll } from "./validateAll";
import { finalErrorGuard } from "../errors/finalErrorGuard";
import { Context } from "../validateModule.types";

export interface ValidateImportProps {
    importPath: string;
    context: Context;
    node:
        | TSESTree.ImportDeclaration
        | TSESTree.ExportNamedDeclaration
        | TSESTree.CallExpression;
}

export const validateImport = ({
    importPath,
    context: { cwd, filename, report, settings },
    node,
}: ValidateImportProps): void => {
    const configPath = `${cwd}${sep}${
        settings["independent-modules/config-path"]
    }`;

    try {
        validateAll({
            filename,
            importPath,
            cwd,
            configPath,
        });
    } catch (error) {
        if (!finalErrorGuard(error)) return;

        report({
            node,
            message: error.message,
        } as unknown as ReportDescriptor<"error">);
    }
};
