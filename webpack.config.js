const path = require('path');

module.exports = [
    {
        entry: path.resolve(__dirname, 'src/app.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'env']
                    }
                }
            ]
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            port: 3000
        },
        devtool: 'inline-source-map'
    }
];