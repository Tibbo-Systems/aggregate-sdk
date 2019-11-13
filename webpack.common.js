const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require('path');

module.exports = {
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd",
        umdNamedDefine: true,
        library: "[name]"
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
        rules: [
            {
                test: /\.(js)?$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    node: {
        fs: 'empty',
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({inject: true, template: path.resolve(__dirname, './src/index.html')}),
        new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'ru'],
        }),
    ]
};
