import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const assetPath = require('path').join(__dirname, 'dist');

const resolve = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.styl'],
    alias: {
      'styles': __dirname + '/src/styles',
      'components': __dirname + '/src/components/',
      'reducers': __dirname + '/src/reducers/',
      'actions': __dirname + '/src/actions/',
      'models': __dirname + '/src/models',
      'middlewares': __dirname + '/src/middlewares/',
      'pages': __dirname + '/src/pages/'
    }
  }
};

const lintLoaders = {
  preLoaders: [{
    test: /\.js$/,
    exclude: [/node_module/, 'mock/*'],
    loader: 'eslint'
  }]
};

const jsLoaders = {
  test: /\.js$/,
  exclude: /node_modules/,
  include: __dirname + '/src',
  loader: 'babel'
};

const loaders = [
  {
    test: /\.styl$/,
    loaders: [
      'style',
      //'css?importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      'css',
      'postcss',
      'stylus'
    ]
  },
  {
    test: /\.css/,
    //exclude: [/node_module/],
    loader: 'style!css'
  },
  {
    test: /\.(png|jpg|woff|woff2|svg)$/,
    loader: 'url?limit=8192'
  }
];

const plugins = {
  development: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html.tpl',
      inject: 'body'
    })
  ],

  production: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html.tpl',
      inject: 'body'
    })
  ]
};

const development = {
  output: {
    path: assetPath,
    filename: 'main.js',
    publicPath: ''
  },
  cache: true,
  debug: true,
  devtool: 'sourcemap',
  entry: [
    'webpack-hot-middleware/client',
    './src/main.js'
  ],
  stats: {
    colors: true,
    reasons: true
  },
  ...resolve,
  module: {
    ...lintLoaders,
    loaders: [{
      ...jsLoaders
    },
      ...loaders
    ]
  },

  plugins: plugins.development,

  stylus: {
    use: [
      require('rupture')()
    ]
  },

  postcss: function () {
    return [
      require('cssnext')({
        autoprefixer: ['last 4 version']
      }),
      require('precss'),
      require('postcss-write-svg'),
      require('postcss-inline-svg')
      //require('postcss-svgo')()
    ]
  }
};

const production = {
  output: {
    path: assetPath,
    filename: 'main-[hash].js',
    publicPath: ''
  },
  devtool: 'sourcemap',
  entry: [
    './src/main.js'
  ],
  ...resolve,
  module: {
    ...lintLoaders,
    loaders: [{
      ...jsLoaders
    },
      ...loaders
    ]
  },

  plugins: plugins.production,

  stylus: {
    use: [
      require('rupture')()
    ]
  },

  postcss: function () {
    return [
      require('cssnext')({
        autoprefixer: ['last 4 version']
      }),
      require('precss'),
      require('postcss-write-svg'),
      require('postcss-inline-svg')
      //require('postcss-svgo')()
    ]
  }
};

export {development, production}
