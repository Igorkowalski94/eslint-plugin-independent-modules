import { ESLintUtils } from "@typescript-eslint/utils";

import { handleCallExpression } from "./helpers/handleCallExpression";
import { handleExportNamedDeclaration } from "./helpers/handleExportNamedDeclaration";
import { validateImport } from "./helpers/validateImport";

export const validateModule = ESLintUtils.RuleCreator(
    () =>
        "https://github.com/Igorkowalski94/eslint-plugin-independent-modules#readme",
)({
    name: "independent-modules",
    meta: {
        docs: {
            description: "Force independent modules",
        },
        type: "problem",
        schema: [],
        messages: {},
    },
    defaultOptions: [],
    create(context) {
        return {
            ImportDeclaration(node): void {
                validateImport({
                    importPath: node.source.value,
                    context,
                    node,
                });
            },
            ExportNamedDeclaration(node): void {
                handleExportNamedDeclaration(node, context);
            },
            CallExpression(node): void {
                handleCallExpression(node, context);
            },
        };
    },
});
