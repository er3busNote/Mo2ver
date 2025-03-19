const path = require('path');
const port = process.env.PORT || 3000;
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production';
    const baseURL = env.REACT_APP_API_URL;

    return {
        mode: devMode ? 'development' : 'production', // → development / production
        entry: './src/index.tsx',
        devtool: devMode ? 'source-map' : false,
        resolve: {
            alias: {
                '@App': path.resolve(__dirname, 'src/App.tsx'),
                '@api': path.resolve(__dirname, 'src/api'),
                '@assets': path.resolve(__dirname, 'src/assets'),
                '@components': path.resolve(__dirname, 'src/components'),
                '@hooks': path.resolve(__dirname, 'src/hooks'),
                '@layouts': path.resolve(__dirname, 'src/layouts'),
                '@pages': path.resolve(__dirname, 'src/pages'),
                '@store': path.resolve(__dirname, 'src/store'),
                '@utils': path.resolve(__dirname, 'src/utils'),
            },
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
                    target: baseURL,
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
            new Dotenv({
                path: devMode ? './.env.development' : './.env.production',
            }),
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
                REACT_APP_API_URL: JSON.stringify(baseURL),
            }),
        ],
    }
};
