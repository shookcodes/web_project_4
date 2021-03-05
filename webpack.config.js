const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//import css from "./src/pages/index.css";
//import html from "./index.html";

module.exports = {
    entry: {
      main: path.resolve(__dirname, "./src/pages/index.js")
    }, 
    output: {
        path: path.resolve(__dirname, "dist"), 
        filename: "main.js", 
        publicPath: ""
      }, 
      mode: 'development', 
      devServer: {
        contentBase: path.resolve(__dirname, './dist'), 
        compress: true, 
        port: 8080,
        open: true 
      },
      module: {
        rules: [
          {
            test: /\.html$/i,
            loader: 'html-loader',
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ],
                plugins: ['@babel/plugin-proposal-class-properties']
              }
            }
          }, 
          {
            test: /\.css$/i,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        "postcss-preset-env",
                        
                      ],
                    ],
                  },
                },
              },
            ],
          },
          {
            test: /\.(ttf|eot|svg|otf|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            include: path.resolve(__dirname, 'src/fonts'),
            use: [{
                loader: 'file-loader', 
                options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/',
                  publicPath: 'fonts/'
                }
            }]
          },
          {
            test: /\.(png|svg|jpe?g|gif)$/,
            include: path.resolve(__dirname, 'src/images'),
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'images/',
                  publicPath: 'images/'
                }
              }
            ]
          },
        ],

      
      },
      plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
          template: 'src/index.html'
        }), 
        //new CleanWebpackPlugin(), 
      ]
  };

