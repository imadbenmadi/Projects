const path = require("path");

module.exports = {
    entry: "./src/main.jsx", // Your main React application file
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Apply loaders to .js files
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader", // Use Babel for transpiling React code
                },
            },
        ],
    },
};
