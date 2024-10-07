const path = require("path");

module.exports = {
  mode: "development", // Set the mode to 'development'
  devtool: "cheap-module-source-map",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
