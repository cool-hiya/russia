const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const GhPagesWebpackPlugin = require('gh-pages-webpack-plugin');
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['./index.js'],
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 4200,
        writeToDisk: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './images'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 85,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: 90,
                                speed: 4,
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    "html-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {publicPath: '../'}
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer()
                            ],
                        }
                    }
                ],
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    outputPath: './fonts'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles.[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new GhPagesWebpackPlugin({
            path: path.resolve(__dirname, 'dist')
        }),
        new webpack.DefinePlugin({
            NODE_ENV: process.env.NODE_ENV
        })
    ]
}