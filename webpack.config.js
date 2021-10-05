// Copyright 2019-2021 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const ManifestPlugin = require('webpack-extension-manifest-plugin')
const pkgJson = require('./package.json')
const manifest = require('./manifest.json')

module.exports = (env, argv) => ({
  context: __dirname,
  devtool: false,
  entry: {
    background: './src/background.ts',
    content: './src/content.ts',
    extension: './src/extension.ts',
    page: './src/page.ts',
  },
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        test: /\.(js|mjs|ts|tsx)$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: require('@polkadot/dev/config/babel-config-webpack.cjs'),
          },
        ],
      },
      {
        test: [/\.svg$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.woff2?$/],
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              esModule: false,
              limit: 10000,
              name: 'static/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    globalObject: "(typeof self !== 'undefined' ? self : this)",
    path: path.join(__dirname, 'build'),
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser.js',
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(argv.mode || 'production'),
        PKG_NAME: JSON.stringify(pkgJson.name),
        PKG_VERSION: JSON.stringify(pkgJson.version),
      },
    }),
    new CopyPlugin({ patterns: [{ from: 'public' }] }),
    new ManifestPlugin({
      config: {
        base: manifest,
        extend: {
          version: pkgJson.version.split('-')[0], // remove possible -beta.xx
        },
      },
    }),
  ],
  resolve: {
    alias: {
      'react/jsx-runtime': require.resolve('react/jsx-runtime'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
    },
  },
  watch: false,
})
