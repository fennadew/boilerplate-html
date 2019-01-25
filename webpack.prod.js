const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const postcssPresetEnv = require('postcss-preset-env')
const cssNano = require('cssnano')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/bundle.[hash].js',
    chunkFilename: 'js/[chunkhash].js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
      })
    ]
  },  
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 
          { 
            loader: 'css-loader', 
            options: {
              sourceMap: false
            }
          }, {
            loader: 'postcss-loader',
            options: { 
              plugins: () => [
                postcssPresetEnv({ browsers: 'last 2 versions' }),
                cssNano()
              ]
            }
          }, {
            loader: 'sass-loader', 
            options: {
              sourceMap: false
            }
          }
        ]
      }, {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /fonts/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash].[ext]'
            }
          }, {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }      
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    })
  ],
})