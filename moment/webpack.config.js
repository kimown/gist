var webpack = require("webpack");
module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"}
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|es|fr|ja|zh-cn|zh-tw)$/)
    ],
};