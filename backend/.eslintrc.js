module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "standard",
        "eslint-config-prettier"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "ignores": ["node_modules/**", "dist/**"],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    }
}
