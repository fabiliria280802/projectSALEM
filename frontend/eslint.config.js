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
    files: ['.eslintrc.js', 'eslint.config.js'],
    languageOptions: {
      sourceType: 'script',
    },
    rules: {},
  },
];
