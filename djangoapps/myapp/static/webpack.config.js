var config = {

    entry: {
        app: './src/app.js'
    },
    output: {
        path: 'build',
        filename: "[name]_webpack.js",
        sourceMapFilename: "[name]_webpack.map"
    },
    cache: true,

    module: {
        loaders: [
            {test: /\.js$/, loader: "jsx-loader?harmony" },
        ]
    },

    devtool: "source-map"
};


module.exports = config;
