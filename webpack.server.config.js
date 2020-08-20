const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/api/index.js',
  output: {
    path: path.resolve(__dirname, 'build', 'api'),
    filename: 'server.js',
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
