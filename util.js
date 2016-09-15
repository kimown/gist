/**
 *
 * some common util method
 *
 * Created by kimown on 16-9-14.
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path')


let request = require('request');
let logger = require('./logger');
let loggerfile=require('./loggerfile');


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
 *
 * reference:
 * http://stackoverflow.com/questions/16188137/how-should-i-pass-json-data-in-the-request-payload-of-http-post-request
 * https://github.com/request/request#streaming
 *
 * @param options
 * @returns {Promise}
 */

exports.request = function (options) {
    // logger.data('request:', options.body);
    return new Promise((resolve, reject)=> {
        request(options, function (err, res) {
            if (err) {
                reject(`请求发送失败，err:${err}`);
            } else {
                let {statusCode} = res;
                let {body}=res;
                logger.data('response:', body);
                resolve({
                    ok: statusCode == 200 ? true : false,
                    body
                });
            }
        })
    })
}


/**
 * https://nodejs.org/dist/latest-v4.x/docs/api/os.html#os_os_eol
 */
exports.os = os;

exports.rmLogFile = function () {
    var filename = path.join(__dirname, 'created-logfile.log');

    try { fs.unlinkSync(filename); }
    catch (ex) {
        loggerfile.info(`删除日志文件created-logfile.log失败,err　${ex}`);
        return;
    }
    loggerfile.info(`删除日志文件created-logfile.log成功`);
};

