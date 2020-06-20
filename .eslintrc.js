const path = require("path");

module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: [
        '@typescript-eslint',
    ],
    parserOptions: {
        project: path.resolve(__dirname, "./tsconfig.json"),
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: "detect"
        }
    },
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint"
    ],
    rules: {
        "@typescript-eslint/explicit-function-return-type": 1,
        "@typescript-eslint/explicit-member-accessibility": 1,
        "@typescript-eslint/no-for-in-array": 2,
        "@typescript-eslint/no-namespace": 1,
        "@typescript-eslint/ban-types": 0,
        "@typescript-eslint/no-inferrable-types": 0
    }
};
