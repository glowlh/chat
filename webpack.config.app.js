'use strict';

const webpack = require('webpack');
const path = require('path');

const modules = [`${__dirname}/node_modules`];
const input = path.join(__dirname, './source/app/');
const output = path.join(__dirname, $.config.output, '/assets/app');

const rules = [

  {
    test: /\.js?$/,
    include: input,
    loader: 'babel-loader',
    query: {
      presets: ['es2015'],
      plugins: ['transform-runtime']
    }
  },
  {
    test: /\.pug$/,
    loader: 'pug-loader'
  }
];

const config = {

  context: input,

  entry: {
    app: './index.js',
  },

  output: {
    path: output,
    filename: '[name].js'
  },

  watch: $.dev,

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: $.dev ? 'inline-source-map' : undefined,

  module: {
    rules
  },

  resolve: {
    modules,
    extensions: ['.js']
  },

  resolveLoader: {
    modules,
    extensions: ['.js']
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin({ NODE_ENV: JSON.stringify($.dev ? '__DEV__' : '__PROD__') }),
  ]
};

if (!$.dev) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      drop_console: true
    })
  );
}

module.exports = config;
