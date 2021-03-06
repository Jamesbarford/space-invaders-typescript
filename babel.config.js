module.exports = {
    presets: [
        ["@babel/preset-env", { useBuiltIns: "entry", corejs: "core-js@3" }],
        "@babel/preset-typescript",
        "@babel/preset-react"
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-optional-chaining"
    ]
};
