const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    entry: {
        "aggregate-sdk.development": "./src/index.ts"
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    mode: "development",
    devtool: 'source-map',
});
