const CopyPlugin = require('copy-webpack-plugin');

const commonConfig = require('./webpack.config.base');

module.exports = [
  {
    ...commonConfig,
    entry: './src/main/main.ts',
    target: 'electron-main',
    output: {
      ...commonConfig.output,
      filename: 'main.bundle.js',
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: 'package.json',
            to: 'package.json',
            transform: (content, _path) => {
              // eslint-disable-line no-unused-vars
              const jsonContent = JSON.parse(content);

              delete jsonContent.devDependencies;
              delete jsonContent.scripts;
              delete jsonContent.build;

              jsonContent.main = './main.bundle.js';
              jsonContent.scripts = { start: 'electron ./main.bundle.js' };
              jsonContent.postinstall = 'electron-builder install-app-deps';

              return JSON.stringify(jsonContent, undefined, 2);
            },
          },
        ],
      }),
    ],
  },
  {
    ...commonConfig,
    entry: './src/main/preload.ts',
    target: 'electron-preload',
    devtool: 'inline-source-map',
    output: {
      ...commonConfig.output,
      filename: 'preload.bundle.js',
    },
  },
];
