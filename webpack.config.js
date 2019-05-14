const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, './bundle'),
    filename: './atomD.min.js',
    library: 'atomD',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      exclude: path.resolve(__dirname, '/node_modules')
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: path.resolve(__dirname, '/node_modules')
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
      ]
    }]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({filename: 'style.css'})
  ]
}
