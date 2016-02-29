require('babel/polyfill');
const autoprefixer = require('autoprefixer');

// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');

var relativeAssetsPath = '../static/dist';
var assetsPath = path.join(__dirname, relativeAssetsPath);

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      //'bootstrap-sass!./src/theme/bootstrap.config.prod.js',
      './semantic/dist/semantic.min.css',
      './src/theme/main.scss',
      './semantic/dist/semantic.min.js',
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['imports?jQuery=jquery,$=jquery,this=>window', strip.loader('debug'), 'babel']},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', '!css!autoprefixer?browsers=last 2 version') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2!autoprefixer?browsers=last 2 version!less') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2!autoprefixer?browsers=last 2 version!postcss!sass!toolbox') },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  },
  toolbox: {theme: './src/theme/toolbox-theme.scss'},
  postcss: [autoprefixer],
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ],
    extensions: ['', '.jsx', '.scss', '.js', '.json'],
  },
  externals: {
    "jQuery": "jQuery"
  },
  plugins: [
    new CleanPlugin([relativeAssetsPath]),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // set global vars
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('production')
      }
    }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    webpackIsomorphicToolsPlugin
  ]
};
