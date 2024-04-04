const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LodashModule = require("lodash-webpack-plugin");
const fs = require('fs');
const path = require('path');
const entry = require('./entry.js');


const files_entry = {
    ...entry.assets_entry(),
    ...entry.widgets_entry(),
    ...entry.blocks_entry()
};

const moduleName = process.argv[4];
const output_dir = moduleName ? path.join(process.cwd(), "include", "Module", moduleName) : process.cwd();
if (moduleName && !fs.existsSync(output_dir)) {
    console.error(`Module ${moduleName} not found`);
    process.exit(1);
}


module.exports = {
    mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
    devtool: false,
    entry: { ...files_entry },
    output: {
        filename: '[name].js',
        path: path.resolve(output_dir, (moduleName ? '../../../' : ".")),
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
    },
    watch: true, // Enable watch mode
    watchOptions: {
        ignored: ["/node_modules/*", "/dist/*"], // Exclude node_modules directory from watching
        aggregateTimeout: 300, // Delay before rebuilding (in milliseconds)
        poll: 1000, // Check for changes every second
    }
};
