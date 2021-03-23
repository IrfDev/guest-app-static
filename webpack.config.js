const WebpackNotifierPlugin = require('webpack-notifier');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: {
    main: './index.js',
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: './',
  },
  watch: false,
  externals: {
    jquery: 'jQuery',
  },
  mode: 'development',
  plugins: [
    // Notify when build succeeds
    new WebpackNotifierPlugin({ alwaysNotify: true }),

    // Minify CSS assets

    // Use BrowserSync plugin for file changes. I.e. if a CSS/SASS/LESS file changes, the changes will be injected directly in the browser with no page load
    new BrowserSyncPlugin(
      {
        proxy: 'mysite.local',
        open: 'external',
        host: 'mysite.local',
        port: 3000,
        files: ['./dist/main.css', './tailwind.config.js'],
      },
      {
        // disable reload from the webpack plugin since browser-sync will handle CSS injections and JS reloads
        reload: false,
      }
    ),
  ],
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
    ],
  },
};
