const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './b2c/charts-advanced/client/src/index.js'
  },
  output: {
    path: path.join(__dirname, 'b2c', 'charts-advanced', 'public'),
    filename: '[name].js'
  },
  devServer: {
    port: 8079,
    proxy: {
      "/api": "http://localhost:8080"
    },
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'b2c', 'charts-advanced', 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'b2c/charts-advanced/client/template.html' })
  ]
};