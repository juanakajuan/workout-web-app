import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
	// Global ignores
	{
		ignores: ["node_modules/**", "dist/**", "build/**", "coverage/**", "*.config.js", ".env", "public/**"],
	},

	// Base config for all files
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	prettierConfig,

	// General settings
	{
		files: ["**/*.{ts,tsx,js,jsx}"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: import.meta.dirname,
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				console: "readonly",
				process: "readonly",
				Buffer: "readonly",
				__dirname: "readonly",
				__filename: "readonly",
			},
		},
		plugins: {
			"@typescript-eslint": tseslint.plugin,
			prettier: prettier,
		},
		rules: {
			"prettier/prettier": "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{
					prefer: "type-imports",
					fixStyle: "separate-type-imports",
				},
			],
			"@typescript-eslint/consistent-type-exports": "error",
			"@typescript-eslint/no-unnecessary-condition": "warn",
			"@typescript-eslint/no-floating-promises": "error",
			"@typescript-eslint/no-misused-promises": "error",
		},
	},

	// React-specific config
	{
		files: ["**/*.{jsx,tsx}"],
		plugins: {
			react: react,
			"react-hooks": reactHooks,
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off",
		},
	}
);
