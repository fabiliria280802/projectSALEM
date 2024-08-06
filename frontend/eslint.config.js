// eslint.config.js
const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat();

module.exports = [
  {
    files: ["**/*.js", "**/*.jsx"],
    ignores: ["node_modules/**", "dist/**"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: true,
        es2021: true,
      },
    },
    plugins: {
      react: require('eslint-plugin-react'),
    },
    rules: {
      "no-unused-vars": "error",
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['.eslintrc.{js,cjs}'],
    languageOptions: {
      sourceType: 'script',
    },
    rules: {},
  },
  ...compat.extends('standard', 'plugin:react/recommended', 'eslint-config-prettier'),
];