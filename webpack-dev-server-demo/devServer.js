/**
 * Created by joey on 29/10/2016.
 */

'use strict';

let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');


var config = require("./webpack.config.js");
// config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
});
server.listen(8080);
