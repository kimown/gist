/**
 *
 * Created by kimown on 16-9-17.
 */

let {path}= require('./../../util');



const dictPath=path.join(__dirname,'..','wordsEn.txt');
const configJsonPath=path.join(__dirname,'..','..','tmp','config.json');
const userDataPath=path.join(__dirname,'..','data.json');

let configPath={

    //初始字典路径
    dictPath,

    //请求带入的服务器url 　用户登陆名
    configJsonPath,

    // 用户上次游戏数据的保存位置
    userDataPath
};

module.exports=configPath;


