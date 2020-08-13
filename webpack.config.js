const path = require('path');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let buildconfig = {
    entry: "./src/app.js",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        writeToDisk: true,
        hot: true,
        watchOptions: {
            poll: true
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.sass$/i,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { sourceMap: true } },
                    { loader: "postcss-loader", options: { sourceMap: true, plugins: [require('autoprefixer')] } },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            implementation: require("sass"),
                            sassOptions: { outputStyle: 'compressed' }
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false
                    }
                }, {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        fallback: require.resolve('image-webpack-loader'),
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: [0.65, 0.90],
                            speed: 4
                        },
                    }
                }],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                map: {
                    inline: false,
                    annotation: true
                }
            }
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
};

if (process.env.GXY_BUILD_SOURCEMAPS || process.env.NODE_ENV == "development") {
    buildconfig.devtool = "source-map";
}

module.exports = buildconfig;