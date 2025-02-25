import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "prettier"
  ),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": await import("@typescript-eslint/eslint-plugin"),
    },
    languageOptions: {
      parser: await import("@typescript-eslint/parser"),
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
    },
  },
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "*.config.js", "*.config.ts"],
  },
];

export default eslintConfig;
