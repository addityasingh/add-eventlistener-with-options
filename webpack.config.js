var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'lib'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'add-eventlistener-with-options'  
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