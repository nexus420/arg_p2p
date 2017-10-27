const webpack = require('webpack')
const path = require('path')

const paths = require('./webpack/paths')
const { devServer } = require('./webpack/dev-server')
const {
  outputFiles,
  rules,
  plugins,
  resolve,
  IS_PRODUCTION,
  IS_DEVELOPMENT
} = require('./webpack/config')

const DashboardPlugin = require('webpack-dashboard/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const entry = [ path.join(paths.javascript, 'client.js') ]

plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: outputFiles.vendor,
    minChunks (module) {
      const context = module.context
      return context && context.indexOf('node_modules') >= 0
    }
  }),
  new HtmlWebpackPlugin({
    template: path.join(paths.app, 'index.html'),
    path: paths.build,
    filename: 'index.html',
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      useShortDoctype: true
    }
  })
)

if (IS_DEVELOPMENT) {
  // Development plugins
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new DashboardPlugin()
  )

  // development: 'react-hot-loader' for .js/.jsx files
  rules[0].use.unshift('react-hot-loader/webpack')
  entry.unshift('react-hot-loader/patch')
}

module.exports = {
  devtool: IS_PRODUCTION ? false : 'cheap-eval-source-map',
  context: paths.javascript,
  watch: !IS_PRODUCTION,
  entry,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: outputFiles.client
  },
  module: {
    rules
  },
  resolve,
  plugins,
  devServer
}
