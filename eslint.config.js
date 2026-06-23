import js from "@eslint/js"
import tseslint from "typescript-eslint"

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ]
    }
  },

  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/*.d.ts"]
  }
]
