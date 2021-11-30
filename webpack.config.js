const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin') 
// Gets the absolute path of the loader
const mPx2remLoaderPath = path.resolve(__dirname, 'loaders/m-px2rem-loader.js') 

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
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',{
                    // loader: 'm-px2rem-loader',
                    loader: mPx2remLoaderPath, // method 3 
                    options: {
                        remUnit: 75,
                        remPrecision: 8
                    }
                }]
        }]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}