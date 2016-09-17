/**
 *
 * some common util method
 *
 * Created by kimown on 16-9-14.
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');


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
                logger.error(`保存文件 ${path}　失败,err: ${err}`);
                reject(err);
            }
        });
    })
};

/**
 * http://stackoverflow.com/questions/30780216/writing-to-a-txt-file-before-node-js-exits
 * https://nodejs.org/dist/latest-v4.x/docs/api/fs.html#fs_fs_writefile_file_data_options_callback
 * @param path
 * @param data
 * @returns {Promise}
 */
exports.writeFileSync = function (path, data) {
    fs.writeFileSync(path, data,'utf8', (err) => {
        if (err) {
            logger.error(`保存文件 ${path}　失败,err: ${err}`);
        }
    });
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

exports.rmFile = function (absolutePath) {

    try {
        fs.unlinkSync(absolutePath);
    } catch (err) {
        logger.info(`删除文件 ${absolutePath} 失败,err　${err}`);
        return;
    }
    logger.info(`删除文件 ${absolutePath} 成功`);
};

// http://unix.stackexchange.com/questions/554/how-to-monitor-cpu-memory-usage-of-a-single-process


/**
 * https://nodejs.org/dist/latest-v4.x/docs/api/fs.html#fs_fs_access_path_mode_callback
 * @param absoultePath
 */
exports.existFileSync=function (absoultePath) {
    let flag=true;
    try{
        fs.accessSync(absoultePath);
    }catch (err){
        flag=false;
    }
    return flag;
};

