const path = require('path')

const dist = path.resolve(__dirname, './dist')

const jsLoader = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
}

module.exports = {
  name: "example",
  mode: "development",
  target: 'web',
  output: {
    path: dist,
    filename: '[name].js',
  },
  entry: {
    index: './index.js'
  },
  module: {
    rules: [jsLoader]
  },
}