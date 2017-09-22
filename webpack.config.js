/**
 * Created by admin on 2017/8/16.
 */
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //每个html文件自动引入css js 文件

var proxypath = "http://123.207.34.129:3000"
module.exports = {
    entry: {
        index: "./entry/index.js",
        aboutUs: "./entry/aboutUs.js",
        articles: "./entry/articles.js",
        article: "./entry/article.js",
       
        community: "./entry/community.js",
        companies:"./entry/companies.js",
        civilAviation:"./entry/civilAviation.js",        //民用航空页面
        baseEducation:"./entry/baseEducation.js"
    },
    output: {
        path: path.resolve("./build"), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/build/',      //模板、样式、脚本、图片等资源对应的server上的路径
        filename: 'js/[name].js',     //每个页面对应的主js的生成配置
        chunkFilename: 'js/[name].chunk.js'   //chunk生成的配置
    },
    devtool: "source-map",
    devServer: {
        proxy:{
            '/user':{
                target: proxypath,
                secure:false
            },
            '/articles':{
                target: proxypath,
                secure:false
            },
        }
    },
    resolve: {
        alias: {
            'view': path.resolve(__dirname, 'view')
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {test: /\.html$/, loader: 'html-loader'},
            {test: /\.js$/, loader: 'babel-loader'},
            {test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=images/[path][name].[ext]?[hash]'},
            {test: /\.eot/, loader: 'file?prefix=font/'},
            {test: /\.woff/, loader: 'file?prefix=font/&limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf/, loader: 'file?prefix=font/'},
            {test: /\.svg/, loader: 'file?prefix=font/'}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk

            chunks: ['index', 'aboutUs', 'articles', 'article', 'community','companies','civilAviation','baseEducation'], //提取哪些模块共有的部分
            // minChunks: 7 // 提取至少3个模块共有的部分
        }),
        //主页
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: path.resolve(__dirname, 'view/index/index.html'),
            inject: 'body',
            chunks: ['vendors', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }),
        //关于我们页面
        new HtmlWebpackPlugin({
            filename: './aboutUs.html',
            template: path.resolve(__dirname, 'view/aboutUs/aboutUs.html'),
            inject: 'body',
            chunks: ['vendors', 'aboutUs'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }),
        //文章列表页面
        new HtmlWebpackPlugin({
            filename: './articles.html',
            template: path.resolve(__dirname, 'view/articles/articles.html'),
            inject: 'body',
            chunks: ['vendors', 'articles'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }),
        //文章详情页面
        new HtmlWebpackPlugin({
            filename: './article.html',
            template: path.resolve(__dirname, 'view/article/article.html'),
            inject: 'body',
            chunks: ['vendors', 'article'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }),



        //社区服务项目
        new HtmlWebpackPlugin({
            filename: './community.html',
            template: path.resolve(__dirname, 'view/community/community.html'),
            inject: 'body',
            chunks: ['vendors', 'community'],   //需要引入的chunk，不配置就会引入所有页面的资源
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }),

        //公司企业服务项目
        new HtmlWebpackPlugin({
            filename: './companies.html',
            template: path.resolve(__dirname, 'view/companies/companies.html'),
            inject: 'body',
            chunks: ['vendors', 'companies'],   //需要引入的chunk，不配置就会引入所有页面的资源
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }),
        //民用航空
        new HtmlWebpackPlugin({
            filename: './civilAviation.html',
            template: path.resolve(__dirname, 'view/civilAviation/civilAviation.html'),
            inject: 'body',
            chunks: ['vendors', 'civilAviation'],   //需要引入的chunk，不配置就会引入所有页面的资源
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }),
        //基础教育
        new HtmlWebpackPlugin({
            filename: './baseEducation.html',
            template: path.resolve(__dirname, 'view/baseEducation/baseEducation.html'),
            inject: 'body',
            chunks: ['vendors', 'baseEducation'],   //需要引入的chunk，不配置就会引入所有页面的资源
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }),
    ]
};