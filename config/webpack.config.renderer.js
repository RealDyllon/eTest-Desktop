const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const commonConfig = require('./webpack.config.base');

module.exports = {
  ...commonConfig,
  entry: './src/renderer/renderer.tsx',
  target: 'web',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist/renderer'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    publicPath: '/',
  },
  output: {
    ...commonConfig.output,
    filename: 'renderer.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
};
