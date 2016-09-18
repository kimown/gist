/**
 *
 * Created by kimown on 16-9-17.
 */

let {path}= require('./../../util');



const dictPath=path.join(__dirname,'..','enwiktionary-latest-all-titles-in-ns0-filter.txt');
const configJsonPath=path.join(__dirname,'config.json');
const userDataPath=path.join(__dirname,'..','data.json');
const logFilePath=path.join(__dirname,'..','..','created-logfile.log');
const scoreLogFilePath=path.join(__dirname,'..','..','created-logfile-score.log');


let configPath={

    //初始字典路径
    dictPath,

    //请求带入的服务器url 　用户登陆名
    configJsonPath,

    // 用户上次游戏数据的保存位置
    userDataPath,

    //日志文件路径
    logFilePath,

    //分数日志文件
    scoreLogFilePath
};

module.exports=configPath;


