/**
 *
 * 用户游戏数据的读写操作
 * Created by kimown on 16-9-16.
 */

'use strict';

let {writeFileSync, existFileSync, rmFileSync, readFile}= require('./../../util');

let initUserData = require('./init-user-data');

let loggerfile = require('./../../loggerfile')();
let configPath = require('./config-path');

/**
 * 读取用户数据，主要是为了断线重连
 * - 如果有用户数据data.json，读取数据作为CONFIG.
 * - 如果没有，则初始化用户数据
 */
async function readUserData() {
    loggerfile.info('---------------初始化操作开始-------------');
    initOperation();
    loggerfile.info('---------------初始化操作结束-------------');
    loggerfile.info('---------------Begin Game-------------');

    //预制英文单词字典
    loggerfile.info('------读取固定的字典数据开始 -------');
    let allWords = await  getAllWords();
    loggerfile.info(`------读取固定的字典数据结束，共　${allWords.length}　个单词 -------`);


    let config = {};
    if (checkBeginNewGame()) {
        loggerfile.info('-------初始化用户数据开始 -------');
        config = await initUserData();
        loggerfile.info('------初始化用户数据结束 -------');
    } else {
        let {userDataPath}=configPath;
        loggerfile.info('------ 断线重连,重新开始上次断线的游戏场景　-------');
        config = require(userDataPath);
        loggerfile.info('------ 断线重连,恢复用户上次的数据　-------');
    }


    config.allWordsArray = allWords;

    return config;

}

/**
 * 读取预制的英文字典数据
 */
async function getAllWords() {
    let {dictPath}=configPath;
    let data2str = await readFile(dictPath);
    let wordsArray = data2str.split('\n');
    return wordsArray;
}

/**
 * 判断是重新开始游戏　还是新建游戏,默认新建游戏
 *
 */
function checkBeginNewGame() {
    let flag = true;
    let {userDataPath}=configPath;
    if (existFileSync(userDataPath)) {
        if (checkUserDataIsValid(userDataPath)) {
            flag = false;
        } else {
            loggerfile.info('-----　data.json文件里面没有sessionId,有情况：删除文件 -------');
            removeDataJson();
        }
    }
    return flag;
}
/**
 * 需要验证上次用户保存的数据的正确性
 */
function checkUserDataIsValid(path) {
    let flag = true;

    let config = require(path);
    if ((config.hasOwnProperty('sessionId')) && config.sessionId) {
        flag = false;
    }

    return flag;
}

/**
 * 保存用户数据
 *
 * - 断线
 * - 程序异常退出　
 * - 玩家突然不想完了
 */

function writeUserData(data) {
    loggerfile.info('------保存用户数据至data.json文件-------');
    let {userDataPath}=configPath;

    writeFileSync(userDataPath, data);

}

/**
 * 运行程序前的一些初始化操作
 * - 清除日志文件
 */
function initOperation() {
    removeLogFile();

}

/**
 * 删除日志文件
 */
function removeLogFile() {
    let {logFilePath}=configPath;
    rmFileSync(logFilePath);
}

function removeDataJson() {
    let {userDataPath}=configPath;
    rmFileSync(userDataPath);
}

module.exports = {
    readUserData,
    writeUserData
};
