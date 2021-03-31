const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const path = require('path');
const webpack = require('webpack');

const views = [
  'index',
  'edn',
  'order',
  'order-details',
  'menu',
  'menus',
  'order-review',
];

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

    ...views.flatMap((view) => {
      return new HtmlWebpackPlugin({
        filename: `${view}.html`,
        template: path.resolve(`./public/${view}.html`),
      });
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
