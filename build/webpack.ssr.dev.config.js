var path = require('path')
var alias = require('./alias')
var webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, 'ssr.dev.entry.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server-renderer.js',
    libraryTarget: 'commonjs'
  },
  resolve: {
    alias: alias
  },
  module: {
    loaders: [
      { test: /\.js/, loader: 'babel!eslint', exclude: /node_modules/ }
    ]
  }
}
