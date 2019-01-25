const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const fs = require('fs');

module.exports = {
  entry: { main: './src/js/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      }, {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        exclude: /images/,
        use: [
          {
            loader: 'file-loader',         
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [ 
    new CleanWebpackPlugin(['dist'])
  ].concat(generateHtmlPlugins()),
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};

function generateHtmlPlugins() {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, ''))

  let htmlTemplates = templateFiles.filter((file) => {
    const parts = file.split('.');
    const name = parts[0];
    const extension = parts[1];

    return extension === 'html';
  })
  .map(file => {
    const parts = file.split('.')
    const name = parts[0]
    const extension = parts[1]
    if (extension === 'html') {
      return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: `./${name}.${extension}`,
        minify: {
          collapseWhitespace: true,
          removeComments: true,
        },
        inject: true,
        hash: true,
        chunks: true
      })
    }
  });

  return htmlTemplates;
}
