module.exports = {
    overrides: [
      {
        files: ["**/*.js", "**/*.jsx"],
        ignores: ["node_modules/**", "dist/**"],
        rules: {
          "no-unused-vars": "error",
        },
      }
    ]
  };
