module.exports = {
    parser: "@typescript-eslint/parser",
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
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
    ],
    rules: {
        "@typescript-eslint/explicit-function-return-type": "on",
        "@typescript-eslint/explicit-member-accessibility": "on",
        "@typescript-eslint/no-explicit-any": "on",
        "@typescript-eslint/no-for-in-array": "on",
        "@typescript-eslint/no-namespace": "on"
    }
};
