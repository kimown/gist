/**
 * 初始化用户游戏数据
 * Created by kimown on 16-9-16.
 */

'use strict';


let loggerfile = require('./../../loggerfile')();
let configPath = require('./config-path');


async function initUserData() {

    //　请求指令
    let action = {
        startGame: 'startGame',
        nextWord: 'nextWord',
        guessWord: 'guessWord',
        getResult: 'getResult'
    };

    //预制英文单词字典
    let allWordsArray = null;

    //已经猜中的单词
    let wordsHasGuessed = [];

    let configJson = getConfigJson();

    //用户id,必填
    let sessionId = null;

    //允许猜测的最大次数，默认10次
    let numberOfGuessAllowedForEachWord = 10;

    // 一共要猜测的单词数量，默认80个
    let numberOfWordsToGuess = 80;


    let currentGuessWord = {
        word: null,

        //正在猜测第几次
        currentGuessCount: 1,

        //已经发送猜出去的字符
        alreadyRequestCharAr: [],

        //经过服务器比对后，已经猜错的字符
        alreadyConfirmWrongCharAr: [],

        //　正在猜第[1,80]个单词
        totalWordCount: 1,

        // 这个单词已经猜错的次数，如果该次数等于　numberOfGuessAllowedForEachWord，则猜测次数已达到上限，直接nextWord
        wrongGuessCountOfCurrentWord: 0
    };

    let config = Object.assign({},
        {action},
        {allWordsArray}, {wordsHasGuessed},
        configJson, {sessionId},
        {numberOfGuessAllowedForEachWord}, {numberOfWordsToGuess},
        {currentGuessWord}
    );


    return config;

};

function getConfigJson() {
    let {configJsonPath}=configPath;

    // 里面包含了　请求url 用户登陆名
    let configJson = require(configJsonPath);

    return configJson;

}


module.exports = initUserData;
