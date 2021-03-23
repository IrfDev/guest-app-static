const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
  },

  mode: 'development',

  plugins: [
    new WebpackNotifierPlugin({ alwaysNotify: true }),

    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('./public/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'edn.html',
      template: path.resolve('./public/edn.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'menu.html',
      template: path.resolve('./public/menu.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'order.html',
      template: path.resolve('./public/order.html'),
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, './public'),
    port: 3000,
    publicPath: 'http://localhost:3000/',
    hotOnly: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
};
