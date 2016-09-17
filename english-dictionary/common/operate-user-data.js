/**
 *
 * 用户游戏数据的读写操作
 * Created by kimown on 16-9-16.
 */

'use strict';

let {writeFileSync,existFileSync,rmFile}= require('./../../util');

let initUserData=require('./init-user-data');

let loggerfile = require('./../../loggerfile');

let configPath=require('./config-path');

/**
 * 读取用户数据，主要是为了断线重连
 * - 如果有用户数据data.json，读取数据作为CONFIG.
 * - 如果没有，则初始化用户数据
 */
async function readUserData() {
    loggerfile.info('---------------初始化操作开始-------------');
    await initOperation();
    loggerfile.info('---------------初始化操作结束-------------');
    loggerfile.info('---------------Begin Game-------------');
    let {userDataPath}=configPath;

    let config;
    if(existFileSync(userDataPath)){
        loggerfile.info('------ 断线重连,重新开始上次断线的游戏场景　-------');
        //TODO 需要验证上次用户保存的数据的正确性，否则......
        config=require(userDataPath);
        loggerfile.info('------ 断线重连,恢复用户上次的数据　-------');
    }else{
        loggerfile.info('-----　-初始化用户数据开始 -------');
         config=　await　initUserData();
        loggerfile.info('-----　-初始化用户数据结束 -------');
    }

    return config;

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

    writeFileSync(userDataPath,data);

}

/**
 * 运行程序前的一些初始化操作
 * - 清除日志文件
 */
async function initOperation() {
    await removeLogFile();



}

/**
 * 删除日志文件
 */
async function removeLogFile() {
    let {logFilePath}=configPath;
    await rmFile(logFilePath);
}

module.exports={
 readUserData,
 writeUserData
};
