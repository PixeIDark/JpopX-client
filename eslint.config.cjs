const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");
const queryPlugin = require("@tanstack/eslint-plugin-query");
const reactHooksPlugin = require("eslint-plugin-react-hooks");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint,
      "@tanstack/query": queryPlugin,
      "react-hooks": reactHooksPlugin,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
      "react-hooks/rules-of-hooks": "error", // react-hooks 규칙 추가
      "react-hooks/exhaustive-deps": "warn", // useEffect 의존성 규칙 추가
    },
  },
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "*.config.js", "*.config.ts"],
  },
];
