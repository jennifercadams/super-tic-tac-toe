import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticJs from "@stylistic/eslint-plugin-js";

const customRules = [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_",
        },
      ],
      "@stylistic/js/quotes": ["error", "double"],
      "@stylistic/js/semi": [ "error", "always" ],
      "@stylistic/js/comma-dangle": [ "error", "always-multiline"],
    }
  }
]

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...customRules,
];
