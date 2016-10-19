var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'browser.js',
        libraryTarget: "umd"        
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel?sourceMap=true'
            }
        ]
    }
}