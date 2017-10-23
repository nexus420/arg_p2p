const paths = require('./paths')
const IS_PRODUCTION = require('./config').IS_PRODUCTION

const devServer = {
  contentBase: IS_PRODUCTION ? paths.build : paths.app,
  historyApiFallback: true,
  port: 3000,
  compress: IS_PRODUCTION,
  inline: !IS_PRODUCTION,
  hot: !IS_PRODUCTION,
  host: '0.0.0.0',
  disableHostCheck: true,
  overlay: true,
  stats: {
    assets: true,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
    colors: true
  }
}

module.exports = {
  devServer
}
