/**
 *
 * some common util method
 *
 * Created by kimown on 16-9-14.
 */
'use strict';

const fs = require('fs');
const os = require('os');


/**
 * promise fs read event
 * https://nodejs.org/dist/latest-v4.x/docs/api/fs.html#fs_fs_readfile_file_options_callback
 * @param path
 * @returns {Promise}
 */
exports.readFile = function (path) {
    return new Promise((resolve, reject)=> {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
};


/**
 * promise fs write event
 * https://nodejs.org/dist/latest-v4.x/docs/api/fs.html#fs_fs_writefile_file_data_options_callback
 * @param path
 * @returns {Promise}
 */
exports.writeFile = function (path, data) {
    return new Promise((resolve, reject)=> {
        fs.writeFile(path, data, (err) => {
            if (err) {
                reject(err);
            }
        });
    })
};


/**
 * https://nodejs.org/dist/latest-v4.x/docs/api/os.html#os_os_eol
 */
exports.os = os;



