const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = merge(common, {
    entry: {
        "aggregate-sdk.development": "./src/index.ts"
    },
    mode: "development",
    devtool: 'eval-source-map',
    plugins: [
        new CleanWebpackPlugin(),
    ]
});
