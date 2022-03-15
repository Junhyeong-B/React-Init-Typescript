"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devServer: {
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: "/node_modules/",
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
