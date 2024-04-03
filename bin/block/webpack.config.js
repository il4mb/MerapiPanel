const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const scanner = require('./scanner.js');
const LodashModule = require("lodash-webpack-plugin");
const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
    devtool: false,
    entry: { ...scanner.getEntry() },
    output: {
        filename: '[name].js',
        path: path.resolve(process.cwd(), './'),
        asyncChunks: false,
    },


    plugins: [
        new MiniCssExtractPlugin(),
        new LodashModule()
    ],
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/i,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                        "@babel/preset-typescript"
                    ]
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            // Replace imports from 'src' with 'dist'
            src: path.resolve(__dirname, 'dist'),
        },
    },
    watch: true, // Enable watch mode
    watchOptions: {
        ignored: ["/node_modules/*", "/dist/*"], // Exclude node_modules directory from watching
        aggregateTimeout: 300, // Delay before rebuilding (in milliseconds)
        poll: 1000, // Check for changes every second
    },
    // compilerOptions: {

    // }
};
