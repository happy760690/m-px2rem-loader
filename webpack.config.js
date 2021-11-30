const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin') 
// Gets the absolute path of the loader
const mPx2remLoaderPath = path.resolve(__dirname, 'loaders/m-px2rem-loader.js') 
const px2vwLoaderPath = path.resolve(__dirname, 'loaders/px2vw-loader.js') 

module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    resolveLoader: { 
        // alias: { // Method 1
        //     'm-px2rem-loader': mPx2remLoaderPath,
        // }
        // modules: ['loaders', 'node_modules'] // method 2, The node_modules option must be added, or the other loaders cannot be found
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader:'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', 
                            '@babel/preset-react']
                    }
                }]
            }
            ,{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    // loader: 'px2rem-loader',
                    // loader: mPx2remLoaderPath, // method 3 
                    loader: px2vwLoaderPath,
                    options: {
                        remUnit: 75,
                        remPrecision: 8,
                        exclude: /antd\.css/
                    }
                }
            ]
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}