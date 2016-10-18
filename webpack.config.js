var path = require('path');

module.exports = {
    entry: ['index'],
    output: {
        filename: 'bundle.js',
        path: 'dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel'
            }
        ]
    }
}