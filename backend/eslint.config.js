module.exports = [
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**", "dist/**"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        node: true,
        es2021: true,
      },
    },
    rules: {
      "no-unused-vars": "error",
    },
  },
  {
    files: ['.eslintrc.js', 'eslint.config.js'],
    languageOptions: {
      sourceType: 'script',
    },
    rules: {},
  },
];