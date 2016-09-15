/**
 * Created by google on 16-9-16.
 */


'use strict';

const path = require('path');

let winston = require('winston');

let filename = path.join(__dirname, 'created-logfile.log');


module.exports = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: filename })
    ]
});