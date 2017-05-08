'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const input = path.join(process.cwd(), './source/js/');
const output = path.join(process.cwd(), $.config.output, '/assets/js');

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
    rules: [
      {
        test: /\.js$/,
        include: input,
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:base64:5]',
              camelCase: true,
            },
          }, {
            loader: 'sass-loader',
          }],
        })
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    // new webpack.DllReferencePlugin({
    //   context: process.cwd(),
    //   manifest: require(`${process.cwd()}/temp/foundation-manifest.json`)
    // }),

    new ExtractTextPlugin('../css/app.css'),

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin({ NODE_ENV: JSON.stringify($.dev ? '__DEV__' : '__PROD__') }),
  ]
};

if (!$.dev) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      warnings: false,
      drop_console: true
    })
  );
}

module.exports = config;
