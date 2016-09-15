/**
 *
 *  fork from https://github.com/winstonjs/winston/blob/master/examples/custom-levels.js
 *
 * Created by kimown on 16-9-15.
 */

var winston = require('winston');

//
// Logging levels
//
var config = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        verbose: 5,
        silly: 6
    },
    colors: {
        error: 'red',
        debug: 'blue',
        warn: 'yellow',
        data: 'grey',
        info: 'green',
        verbose: 'cyan',
        silly: 'magenta'
    }
};

var logger = module.exports = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true
        }),
        // new (winston.transports.File)({filename: 'somefile.log'})
    ],
    levels: config.levels,
    colors: config.colors
});

