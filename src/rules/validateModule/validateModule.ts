import { sep } from "path";

import { ESLintUtils } from "@typescript-eslint/utils";
import { ReportDescriptor } from "@typescript-eslint/utils/dist/ts-eslint/Rule";

import { finalErrorGuard } from "./errors/FinalError/helpers/finalErrorGuard";
import { validateAll } from "./helpers/validateAll";

export const validateModule = ESLintUtils.RuleCreator(
    () =>
        "https://github.com/Igorkowalski94/eslint-plugin-independent-modules#readme",
)({
    name: "independent-modules",
    meta: {
        docs: {
            description: "Force independent modules",
        },
        type: "suggestion",
        schema: [],
        messages: {
            error: `error`,
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            ImportDeclaration(node): void {
                const importPath = node.source.value;
                const configPath = `${context.cwd}${sep}${
                    context.settings["independent-modules/config-path"]
                }`;
                const { filename, cwd } = context;

                try {
                    validateAll({
                        filename,
                        importPath,
                        cwd,
                        configPath,
                    });
                } catch (error) {
                    if (!finalErrorGuard(error)) return;

                    context.report({
                        node,
                        message: error.message,
                    } as unknown as ReportDescriptor<"error">);
                }
            },
        };
    },
});
