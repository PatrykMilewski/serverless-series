const baseConfig = require('@serverless-series/config/webpack.config.js');
const path = require('path');

module.exports = {
  ...baseConfig,
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
};
