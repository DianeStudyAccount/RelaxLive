const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/js/main.js",
    admin: "./src/js/admin.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        // Порядок важен: сначала style-loader, потом css-loader
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
     {
  test: /\.(png|jpg|jpeg|gif|svg)$/i,
  type: "asset/resource",
  generator: {
    filename: "images/[name].[hash:6][ext]", 
  },
},
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      template: "./admin/index.html",
      filename: "admin.html",
      chunks: ["admin"],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    open: true,
  },
};