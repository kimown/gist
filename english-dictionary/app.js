/**
 * Created by kimown on 16-9-14.
 */


'use strict';

const path = require('path');


let {requestUrl, playerId}=require('./../tmp/config.json');
let {request, readFile,rmFile}= require('./../util');
let logger = require('./../logger');
let loggerfile = require('./../loggerfile');
let {writeUserData}=require('./common');



process.on('uncaughtException', (err) => {

    console.log(err);
});

process.on('exit',(code) => {
    //如果程序异常退出且 totalWordCount 没有达到 一共要猜测的单词数量 ,保存用户数据
    saveUserDataSync();
    console.log(`About to exit with code: ${code}`);
});



const CONFIG = {
    action: {
        startGame: 'startGame',
        nextWord: 'nextWord',
        guessWord: 'guessWord',
        getResult:'getResult'
    },
    allWordsArray: [],
    requestUrl,
    playerId,　　　　　　　//用户账号
    sessionId: null,　　//用户id,必填
    numberOfGuessAllowedForEachWord: null,  //允许猜测的最大次数，默认10次
    numberOfWordsToGuess: null,　　　　　　　　// 一共要猜测的单词数量，默认80个
    currentGuessWord: {
        word: null,

        //正在猜测第几次
        currentGuessCount: 1,

        //已经发送猜出去的字符
        alreadyRequestCharAr:[],

        //　正在猜第[1,80]个单词
        totalWordCount: 1,

        // 这个单词已经猜错的次数，如果该次数等于　numberOfGuessAllowedForEachWord，则猜测次数已达到上限，直接nextWord
        wrongGuessCountOfCurrentWord: 0
    }
};



async function main() {

    // try {
        await removeLogFile();
        await getAllWords();
        await startGame();

    //
    // } catch (e) {
    //     handleError(e);
    // }

}


/**
 * 1. Start Game
 * https://github.com/strikingly/strikingly-interview-test-instructions#1-start-game
 */
async function startGame() {
    let postData = {
        playerId: CONFIG.playerId,
        action: CONFIG.action.startGame
    };
    let res = await request({
        method: 'post',
        body: postData,
        json: true,
        url: CONFIG.requestUrl
    });
    let {body, ok}=res;
    if (ok == true) {
        let {data, message, sessionId}=body;
        let {numberOfGuessAllowedForEachWord, numberOfWordsToGuess}=data;
        logger.info(`message: ${message} ,您的身份标示是 ${sessionId} ,您一共要猜测 ${numberOfWordsToGuess} 个单词,每个单词限制猜测 ${numberOfGuessAllowedForEachWord} 次`);

        CONFIG.sessionId = sessionId;
        CONFIG.numberOfGuessAllowedForEachWord = numberOfGuessAllowedForEachWord;
        CONFIG.numberOfWordsToGuess = numberOfWordsToGuess;

    } else {
        logger.error(`启动游戏失败!!!失败原因:`, res.body);
    }

    await GiveMeAWord();

}


/**
 *　2. Give Me A Word
 * https://github.com/strikingly/strikingly-interview-test-instructions#2-give-me-a-word
 */
async function GiveMeAWord() {
    let postData = {
        sessionId: CONFIG.sessionId,
        action: CONFIG.action.nextWord
    };
    let res = await request({
        method: 'post',
        body: postData,
        json: true,
        url: CONFIG.requestUrl
    });
    let {body, ok}=res;
    if (ok == true) {
        let {data}=body;
        let {totalWordCount, word, wrongGuessCountOfCurrentWord}=data;
        CONFIG.currentGuessWord.totalWordCount = totalWordCount;
        CONFIG.currentGuessWord.word = word;
        CONFIG.currentGuessWord.wrongGuessCountOfCurrentWord = wrongGuessCountOfCurrentWord;
        await makeAGuess(CONFIG);
    } else {
        logger.error(`获取猜谜单词失败!!!失败原因:`, res.body);
    }
}


/**
 * 3.Make A Guess
 * https://github.com/strikingly/strikingly-interview-test-instructions#3-make-a-guess
 * 猜测当前的单词
 */
async function makeAGuess() {
    let {currentGuessWord, numberOfGuessAllowedForEachWord,numberOfWordsToGuess}=CONFIG;
    let {wrongGuessCountOfCurrentWord, totalWordCount, word,currentGuessCount}=currentGuessWord;
    //如果正在猜的单词数等于一共要猜测的单词数量，GAME OVER,查询分数
    if(totalWordCount>numberOfWordsToGuess){
        await GetYourResult();
        return;
    }

    //如果正在猜测第几次超过允许猜测的最大次数
    if (currentGuessCount > numberOfGuessAllowedForEachWord) {
        loggerfile.info(`第${totalWordCount}个单词: 第${currentGuessCount}次猜测, 次数已经达到默认上限 ${numberOfGuessAllowedForEachWord} ，开始下一轮.......failing`);
        initCurrentGuessWordStatus();
        await GiveMeAWord();
    } else {
        logger.info(`第${totalWordCount}个单词: 第${currentGuessCount}次猜测,单词内容是 ${word},已经猜错了${wrongGuessCountOfCurrentWord}次(${numberOfGuessAllowedForEachWord})`);
        let mostPossibleChar = getBestMatchChar();

        let postData = {
            sessionId: CONFIG.sessionId,
            action: CONFIG.action.guessWord,
            guess: mostPossibleChar
        };
        let res = await request({
            method: 'post',
            body: postData,
            json: true,
            url: CONFIG.requestUrl
        });

        setCurrentGuessStatus(res);
        //如果单词没有全部猜对，递归调用猜词方法;否则直接nextWord
        if(checkWordCotainAsterisks()){
            await makeAGuess();
        }else{
            loggerfile.info(`-----　第${totalWordCount}个单词猜测成功，答案是 ${CONFIG.currentGuessWord.word} ------`);
            initCurrentGuessWordStatus();
            await GiveMeAWord();
        }
    }
}


/**
 *
 * 4. Get Your Result
 */
async function GetYourResult(){
    let postData = {
        sessionId: CONFIG.sessionId,
        action: CONFIG.action.getResult
    };
    let res = await request({
        method: 'post',
        body: postData,
        json: true,
        url: CONFIG.requestUrl
    });
    loggerfile.info(`最后得分`,res);
}

/**
 * 初始化当前猜词状态
 */
function initCurrentGuessWordStatus() {
    let {currentGuessWord}=CONFIG;
    currentGuessWord.word=null;
    currentGuessWord.currentGuessCount=1;
    currentGuessWord.alreadyRequestCharAr=[];
    //重点是这个猜词的个数+1
    currentGuessWord.totalWordCount=++currentGuessWord.totalWordCount;
    currentGuessWord.wrongGuessCountOfCurrentWord=0;
}

/**
 * 判断单词是否含有*号
 */
function checkWordCotainAsterisks() {
    let {currentGuessWord}=CONFIG;
    let { word}=currentGuessWord;
    return word.includes('*');
}



/**
 * 判断单词中是否全部都是*号
 */
function checkWordAllAsterisks() {
    let {currentGuessWord}=CONFIG;
    let { word}=currentGuessWord;
    return word.split('').every((v)=>{
        return v=='*'
    })
}

/**
 * 针对不同的响应，更新当前的猜词状态
 * @param res
 */
function setCurrentGuessStatus(res) {
    let {body, ok}=res;
    let {data}=body;
    let {totalWordCount, word, wrongGuessCountOfCurrentWord}=data;
    if (ok == true) {
        CONFIG.currentGuessWord.totalWordCount = totalWordCount;
        CONFIG.currentGuessWord.word = word;
        CONFIG.currentGuessWord.wrongGuessCountOfCurrentWord = wrongGuessCountOfCurrentWord;
        CONFIG.currentGuessWord.currentGuessCount = ++CONFIG.currentGuessWord.currentGuessCount;
    } else {

    }
}


/**
 * 思路：先获取单词的length ,只过滤剩下掉指定长度的word,然后这些word里面循环判断26个字母哪个字母的出现频率最高（同一个字母中重复字符忽略不计数）
 *
 * 获取最可能的字符
 */
function getBestMatchChar() {
    let {currentGuessWord, allWordsArray}=CONFIG;
    let {word, totalWordCount,alreadyRequestCharAr}=currentGuessWord;
    let wordLength = word.length;
    let allWordsArrayAfterSpecifyLenth = allWordsArray.filter((v)=> {
        return v.trim().length == wordLength && v.trim().indexOf("'") == -1;
    })
    logger.info(`第${totalWordCount}个单词: 先按照长度为 ${wordLength}　的英文单词过滤，过滤后共剩下 ${allWordsArrayAfterSpecifyLenth.length}个`);

    if(!checkWordAllAsterisks()){
        allWordsArrayAfterSpecifyLenth=allWordsArrayAfterSpecifyLenth.filter((v)=>{
            v=v.toUpperCase();
            let flag=true;
            word.split('').map((singleChar,k)=>{
                if(singleChar!='*'){
                    if(v[k]!=singleChar){
                        flag=false;
                    }
                }
            })
            return flag;
        })
        logger.info(`第${totalWordCount}个单词:　由于不是全*号，按照单词内容 ${word}　过滤, 过滤后共剩下 ${allWordsArrayAfterSpecifyLenth.length}个`);
    }

    let objCount = {};
    allWordsArrayAfterSpecifyLenth.map((item)=> {
        let s = new Set();
        for (let i in item) {
            //如果是已经发送的猜测字符，那么下一次不继续发送了
            if(!alreadyRequestCharAr.includes(item[i].toUpperCase())){
                s.add(item[i]);
            }
        }
        for (let key of s.values()) {
            if (objCount[key]) {
                objCount[key] = (++objCount[key]);
            } else {
                objCount[key] = 1;
            }
        }
    })
    let maxKey;
    for (let i in objCount) {
        if (!maxKey) {
            maxKey = i;
        } else if (maxKey && objCount[maxKey] < objCount[i]) {
            maxKey = i;
        }
    }
    let mostPossibleChar = maxKey.toUpperCase();
    logger.info(`第${totalWordCount}个单词: 按照出现频率最高的字符是 ${mostPossibleChar} `);

    CONFIG.currentGuessWord.alreadyRequestCharAr.push(mostPossibleChar);

    return mostPossibleChar;
}



/**
 * 读取预制的英文字典数据
 */
async function getAllWords() {
    let data = await readFile('./wordsEn.txt');
    let data2str = data.toString();
    let wordsArray = data2str.split('\r');
    CONFIG.allWordsArray = wordsArray;
}


/**
 * 删除日志文件
 */
async function removeLogFile() {
    let filePath = path.join(__dirname,'..','created-logfile.log');
    await rmFile(filePath);
}


function saveUserDataSync() {
     writeUserData(JSON.stringify(CONFIG,null,2));
}


main();
