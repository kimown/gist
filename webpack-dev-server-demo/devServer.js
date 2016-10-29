/**
 * Created by joey on 29/10/2016.
 */

'use strict';

const path = require('path');


let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');


var config = require("./webpack.config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {

    // server the static html
    contentBase:path.join(__dirname,'build'),

    // NodeJS API: server js from this path
    publicPath: "/assets/"


});
server.listen(8080);
