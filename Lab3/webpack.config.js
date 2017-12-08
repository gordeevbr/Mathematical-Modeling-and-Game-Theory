const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.tsx'
  },
  output: {
    path: __dirname + './dist/bundles/',
    filename: '[name].bundle.js',
    publicPath: '/bundles/'
  },
  devServer: {
    contentBase: path.join(__dirname, './dist/'),
    publicPath: '/bundles/',
    stats: 'minimal',
    port: 8081
  },
  devtool: "source-map",
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }
};
