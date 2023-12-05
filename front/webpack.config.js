const path = require('path');
const port = process.env.PORT || 3000;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: process.env.NODE_ENV , // → development / production
    entry: './src/index.tsx',
    devtool: devMode ? 'source-map' : false,
    resolve: {
        extensions: ['.ts', '.tsx', '.js'], // node_module → .js 필수!
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './', // → 상대경로 설정
        filename: 'js/[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
        ],
    },
    devServer: {
        host: 'localhost',
        port: port,
        proxy: {
            '/api': {
                target: process.env.REACT_APP_API_URL,
                pathRewrite: { 
                    "^/api": ""
                },
                changeOrigin: true,
            }
        },
        static: {
            directory: path.join(__dirname, "dist"),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // public/index.html 파일을 읽음
            filename: 'index.html', // output으로 출력할 파일은 index.html
            indect: true,
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
        }),
        new webpack.DefinePlugin({  // → 배포 시, 환경설정 가져오기
            'process.env': JSON.stringify(process.env),
        }),
    ],
};
