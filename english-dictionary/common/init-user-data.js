/**
 * 初始化用户游戏数据
 * Created by kimown on 16-9-16.
 */

'use strict';
let {readFile}= require('./../../util');

//请求url 　用户登陆名
let {requestUrl, playerId}=require('./../../tmp/config.json');

let logger = require('./../../logger');
let loggerfile = require('./../../loggerfile');

async function initUserData() {
    let config={};


    //　请求指令
    let action={
        startGame: 'startGame',
        nextWord: 'nextWord',
        guessWord: 'guessWord',
        getResult:'getResult'
    };

    //预制英文单词字典
    // let allWordsArray=await getAllWords();


    // let config=Object.assign({},{action},{allWordsArray},{requestUrl},{playerId});

    
    return config

};


/**
 * 读取预制的英文字典数据
 */
async function getAllWords() {
    let data = await readFile('./../wordsEn.txt');
    let data2str = data.toString();
    let wordsArray = data2str.split('\n');
    return wordsArray;
}

async function readUserData() {

}

module.exports=initUserData;
