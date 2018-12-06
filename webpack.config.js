const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: { main: './src/js/app.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true 
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 
          { 
          loader: 'css-loader', options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader', options: {
            sourceMap: true
          }
        }]
      }
    ]
  },
  plugins: [ 
    new CleanWebpackPlugin('dist', {} ),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ]
};



// function generateHtmlPlugins() {
//   const templateFiles = fs.readdirSync(path.resolve(__dirname, ''))
//   return templateFiles.map(item => {
//     const parts = item.split('.')
//     const name = parts[0]
//     const extension = parts[1]
//     if (extension === 'html') {
//       return new HtmlWebpackPlugin({
//         filename: `${name}.html`,
//         template: path.resolve(__dirname, `/${name}.${extension}`)
//       })
//     }
//   })
// }

// const htmlPlugins = generateHtmlPlugins()