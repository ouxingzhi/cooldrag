var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:{
        main:'./src/js/index.js'
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'[name].js',
        library: "CoolDrag",
        libraryTarget: "umd"
    },
    devtool: "eval",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({

                    fallback: 'style-loader',
                    use: ['css-loader', 'stylus-loader']
                })
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({ 
            filename: './index.html',
            template: './demo/index.html',
            inject:'head'
        }),
        new ExtractTextPlugin('dist/main.css')
    ]
}