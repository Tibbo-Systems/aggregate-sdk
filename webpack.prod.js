const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  entry: {
    'aggregate-sdk.production.min': './src/index.ts',
  },
  mode: 'production',
  devtool: 'source-map',
  //    plugins: [new BundleAnalyzerPlugin()]
});
