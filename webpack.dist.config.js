/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');

var assetPath = require('path').join(__dirname, 'dist');
var exclusions = [/node_module/, 'server.js'];

module.exports = {

  output: {
    path: assetPath,
    filename: 'main.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  progress: true,
  entry: [
    './src/main.js'
  ],

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.styl'],
    alias: {
      'styles': __dirname + '/src/styles',
      'components': __dirname + '/src/components/',
      'reducers': __dirname + '/src/reducers/',
      'actions': __dirname + '/src/actions/',
      'middlewares': __dirname + '/src/middlewares/',
      'pages': __dirname + '/src/pages/',
      'react': __dirname + '/node_modules/react',
      'react/addons': __dirname + '/node_modules/react/addons'
    }
  },
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: exclusions,
      loader: 'eslint'
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: exclusions,
      loader: 'babel'
    }, {
      test: /\.scss/,
      exclude: exclusions,
      loader: 'style!css!autoprefixer!sass?outputStyle=expanded'
    }, {
      test: /\.css$/,
      exclude: [/\.raw\.css$/, /\.useable\.css$/, /node_modules/],
      loader: 'style!css!autoprefixer'
    }, {
      test: /\.useable\.css$/,
      exclude: exclusions,
      loader: 'style/useable!raw!autoprefixer'
    }, {
      test: /\.raw\.css$/,
      loader: 'style!raw!autoprefixer'
    }, {
      test: /\.(png|jpg|woff|woff2)$/,
      exclude: exclusions,
      loader: 'url?limit=8192'
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]

};
