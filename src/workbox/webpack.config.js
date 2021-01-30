var path = require('path');

module.exports = {
  mode: 'production', // set environment for workbox only (`production` or `development`)
  entry: './swtemplate.ts',
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'swtemplate.js'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'ts-loader'
    }]
  },
  resolve: { extensions: [".js", ".ts"] }
};
