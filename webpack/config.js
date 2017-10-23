const webpack = require('webpack')
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const { outputFiles } = require('./output-files')

const paths = require('./paths')

const NODE_ENV = process.env.NODE_ENV || 'development'
const IS_DEVELOPMENT = NODE_ENV === 'development'
const IS_PRODUCTION = NODE_ENV === 'production'

const plugins = [
  new ExtractTextPlugin(outputFiles.css),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV)
    }
  })
]

if (IS_PRODUCTION) {
  // Shared production plugins
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        comparisons: true,
        conditionals: true,
        dead_code: true,
        drop_console: true,
        drop_debugger: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        screw_ie8: true,
        sequences: true,
        unused: true,
        warnings: false
      },
      output: {
        comments: false
      }
    })
  )
} else {
  plugins.push(
    new webpack.NamedModulesPlugin()
  )
}

const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [ 'babel-loader' ]
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'babel-loader'
      },
      {
        loader: 'react-svg-loader',
        options: {
          svgo: {
            plugins: [
              {
                removeTitle: true
              }
            ],
            floatPrecision: 2
          }
        }
      }
    ],
    include: paths.svg
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    include: paths.images,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'client/assets/[name]-[hash].[ext]'
        }
      }
    ]
  },
  {
    test: /\.(ttf|eot|woff|woff2)$/,
    loader: 'file-loader',
    options: {
      name: 'client/assets/[name]-[hash].[ext]'
    }
  }
]

const getSassRules = () => {
  const autoprefixerOptions = {
    browsers: [
      'last 3 version',
      'ie >= 10'
    ]
  }

  const sassLoaders = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: IS_DEVELOPMENT,
        minimize: IS_PRODUCTION
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: IS_DEVELOPMENT,
        plugins: () => [
          autoprefixer(autoprefixerOptions)
        ]
      }
    },
    {
      loader: 'sass-loader',
      options: { sourceMap: IS_DEVELOPMENT }
    }
  ]

  if (IS_PRODUCTION) {
    return {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        use: sassLoaders
      })
    }
  }

  return {
    test: /\.scss$/,
    use: [ { loader: 'style-loader' } ].concat(sassLoaders)
  }
}

rules.push(getSassRules())

const resolve = {
  extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
  modules: [
    path.join(__dirname, '../node_modules'),
    paths.app
  ]
}

module.exports = {
  outputFiles,
  plugins,
  resolve,
  rules,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  NODE_ENV
}
