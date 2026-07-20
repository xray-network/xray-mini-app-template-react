import eslint from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["build/**", ".react-router/**", "node_modules/**"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/globals": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
  {
    files: [
      "app/root.tsx",
      "app/routes/**/*.tsx",
      "app/theme/index.tsx",
      "app/integrations/cardano-web-js/CardanoProvider.tsx",
    ],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  }
)
