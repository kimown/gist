/**
 * Created by google on 16-9-16.
 */


'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

let winston = require('winston');

let filename = path.join(__dirname, 'created-logfile.log');


module.exports = function (absoultePath , appendFlag ) {
    let option = {filename: absoultePath?absoultePath:filename};
    if (appendFlag) {
        option = {
            stream: fs.createWriteStream(absoultePath, {flags: 'a'})
        };
    }
    return new (winston.Logger)({
        transports: [
            new (winston.transports.File)(option)
        ]
    });
}

