var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var ExtractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
})
module.exports = {
  entry: {
    app: './src/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react','es2015','stage-3']
            }
          }
        ]
      },
      {
        test: /\.sass$/,
        use: ExtractPlugin.extract({
          use: ['css-loader', {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
                return [
                  precss,
                  autoprefixer
                ];
              }
            }
          },
          'sass-loader'
        ]
        })
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              publicPath: './'
            }
          }
        ]
      }
     

      
      // {
      //   test: /\.js$/,
      //   use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
      //   exclude: /node_modules(?!\/webpack-dev-server)/,
      // }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    ExtractPlugin,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'minicart.html',
    //   template: 'src/minicart.html',
    //   chunks: []
    // }),
    new CleanWebpackPlugin(['dist'])
    // new webpack.optimize.UglifyJsPlugin({
    //   ///
    // })
  ]

}