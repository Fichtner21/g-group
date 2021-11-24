const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { basename } = require("path");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src", "js", "script.js"),
  },
  output: {
    publicPath: '',
    path: path.resolve(__dirname, "dist"),
    filename: "js/script.bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 9001,
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,                  
        use: [
          {
            loader: "url-loader",            
            options: {
              name: "images/[name].[ext]",             
            },            
          },
        ],        
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            // options: {
            //   attributes: {
            //     list: [
            //       {
            //         tag: "img",
            //         attribute: "data-src",
            //         type: "src",
            //       },
            //       {
            //         tag: "img",
            //         attribute: "data-srcset",
            //         type: "srcset",
            //       },
            //     ],
            //   },
            // },
          },
        ],
      },     
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("tailwindcss")("./tailwind.config.js"),
                  require("autoprefixer"),
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: require("fibers"),
                includePaths: ["./node_modules"],
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "page.html",
      template: "src/page.html",
    }),
    new MiniCssExtractPlugin({ filename: "css/style.css" }),
    new webpack.HotModuleReplacementPlugin(),   
    //new CopyWebpackPlugin([{ from: './src/images', to: 'images' }]),
  ],  
};
