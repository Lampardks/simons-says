const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');

const workersPool = {
  workers: require('os').cpus().length,
  workerParallelJobs: 50,
  poolTimeout: Infinity,
};

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    bundle: [
      'webpack-hot-middleware/client',
      resolve(__dirname, './app/index.js'),
    ],
  },
  output: {
    path: resolve(__dirname, `../dist`),
    devtoolModuleFilenameTemplate: '/[absolute-resource-path]',
    publicPath: '/',
    filename: 'js/bundle.js?react',
    chunkFilename: 'js/[name].chunk.js?react',
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|es6)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|svg|jpeg|ttf|eot|woff2|wff)$/,
        use: ['url-loader?limit=4096&name=imgs/[name]_[hash:8].[ext]?react'],
      },
      {
        test: /\.(mp3)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'thread-loader',
            options: workersPool,
          },
          'style-loader',
          'css-loader',
          'postcss-loader',
          'fast-sass-loader',
        ],
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html',
    }),
    new WebpackBar(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
