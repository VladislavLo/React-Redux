const path = require('path');
const APP_DIR = path.resolve(__dirname, 'app');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

module.exports = {

    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js?$/,
                options: {
                    presets: [
                        'react', 'stage-2',
                        ['env', { targets: { browsers: ['last 2 versions'] } }]
                    ]
                },
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    entry: APP_DIR + '/js/index.js',

    devServer: {
        contentBase: PUBLIC_DIR,
        port: 9000,
        open: true
    },

    output: {
        path: PUBLIC_DIR,
        filename: 'clientbundle.js'
    }
};
