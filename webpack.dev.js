const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'js/bundle.js',
    chunkFilename: `js/[name].js`
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
          {  
            loader: 'css-loader', 
            options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader', 
            options: {
              sourceMap: true
            }
          }
        ]
      }, {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        exclude: /fonts/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [ 
    new webpack.HotModuleReplacementPlugin()
  ]
})