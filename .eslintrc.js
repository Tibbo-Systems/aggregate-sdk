module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: [
        '@typescript-eslint',
        'jest',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:jest/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: false
        }
    },
    rules: {
        "no-constant-condition": ["error", { "checkLoops": false }],
        "@typescript-eslint/no-empty-function": ["error", { "allow": ["functions","methods"] }],
        "@typescript-eslint/camelcase": ["error",{"allow": [ "_static_" ]} ],
        '@typescript-eslint/no-this-alias': [
            'error',
            {
                allowedNames: ['_this'],
            },
        ],
    }
};