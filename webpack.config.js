var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;
var PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'docs'),
  modules: path.join(__dirname, 'node_modules')
};

var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: PATHS.app + '/index.html',
  filename: 'index.html',
  inject: 'body'
});

var common = {
  entry: [PATHS.app],
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        include: PATHS.app,
        loaders: ['eslint']
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        include: PATHS.app,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },

      // SCSS loader
      // Use require('<stylesheet>') in your js
      {
        test: /\.scss$/,
        include: PATHS.app,
        loaders: ["style", "css", "sass"]
      },

      // Images
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)(\?\S*)?$/,
        loader: 'url-loader?limit=8192&name=[name]-[hash].[ext]'
      }
    ],
  },
  plugins: [HTMLWebpackPluginConfig]
}

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    output: {
      publicPath: 'http://localhost:3000/'
    },
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {
    output: {
      publicPath: ''
    },
    plugins: [HTMLWebpackPluginConfig]
  });
}
