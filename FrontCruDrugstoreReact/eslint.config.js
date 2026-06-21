import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1. Aplica la configuración recomendada de JavaScript a todos los archivos
  js.configs.recommended,

  // 2. Aplica la configuración recomendada de React
  pluginReact.configs.flat.recommended,

  // 3. Ajustes globales del entorno y tipos de archivos
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-vars": "warn"
    },
  },
  eslintConfigPrettier,
  
]);

