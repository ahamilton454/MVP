const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './client/src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname)
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Run the following rules on targeted files
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                }
            },
        ]
    }
}