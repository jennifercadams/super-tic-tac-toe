import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import stylisticJs from "@stylistic/eslint-plugin-js";

const customRules = [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      "react": {
        "version": "detect",
      },
    },
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
      "@stylistic/js/jsx-quotes": [ "error", "prefer-double" ],
      "@stylistic/js/semi": [ "error", "always" ],
      "@stylistic/js/comma-dangle": [ "error", "always-multiline"],
    },
  },
];

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  ...customRules,
];
