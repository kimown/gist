/**
 * Created by kimown on 16-9-14.
 */


'use strict';
let {requestUrl, playerId}=require('./../tmp/config.json');
let {request, logger, readFile}= require('./../util');


const CONFIG = {
    action: {
        startGame: 'startGame',
        nextWord: 'nextWord',
        guessWord: 'guessWord'
    },
    allWordsArray: [],
    requestUrl,
    playerId,　　　　　　　//用户账号
    sessionId: null,　　//用户id,必填
    numberOfGuessAllowedForEachWord: null,  //允许猜测的最大次数，默认10次
    numberOfWordsToGuess: null,　　　　　　　　// 一共要猜测的单词数量，默认80个
    currentGuessWord: {
        word: null,
        //　正在猜第[1,80]个单词
        totalWordCount: 1,
        // 这个单词已经猜错的次数，如果该次数等于　numberOfGuessAllowedForEachWord，则猜测次数已达到上限，直接nextWord
        wrongGuessCountOfCurrentWord: 0
    }
};


async function main() {

    try {
        await getAllWords();
        await startGame();


    } catch (e) {
        handleError(e);
    }

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
        // logger.info(`正在猜测第 ${totalWordCount} 个单词(${CONFIG.numberOfWordsToGuess})，单词内容是　${word} ,已经猜错了　${wrongGuessCountOfCurrentWord} 次(${CONFIG.numberOfGuessAllowedForEachWord})`);
        CONFIG.currentGuessWord.totalWordCount = totalWordCount;
        CONFIG.currentGuessWord.word = word;
        CONFIG.currentGuessWord.wrongGuessCountOfCurrentWord = wrongGuessCountOfCurrentWord;
        await makeAGuess();
    } else {
        logger.error(`启动游戏失败!!!失败原因:`, res.body);
    }
}


/**
 * 3.Make A Guess
 * https://github.com/strikingly/strikingly-interview-test-instructions#3-make-a-guess
 * 猜测当前的单词
 */
async function makeAGuess() {
    let {currentGuessWord, numberOfGuessAllowedForEachWord}=CONFIG;
    let {wrongGuessCountOfCurrentWord, totalWordCount, word}=currentGuessWord;
    if (wrongGuessCountOfCurrentWord == numberOfGuessAllowedForEachWord) {
        logger.error(`第${totalWordCount}个单词: 第${totalWordCount}次猜测, 次数已经达到默认上限 ${numberOfGuessAllowedForEachWord} ，开始下一轮.......failing`);
        await GiveMeAWord();
    } else {
        console.log(`${totalWordCount}`);
        logger.info(`第${totalWordCount}个单词: 第${totalWordCount}次猜测,单词内容是 ${word},已经猜错了${wrongGuessCountOfCurrentWord}次(${numberOfGuessAllowedForEachWord})`);
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
        let {body, ok}=res;
        let {data}=body;
        let {totalWordCount, word, wrongGuessCountOfCurrentWord}=data;

        if (ok == true) {
            CONFIG.currentGuessWord.totalWordCount = totalWordCount;
            CONFIG.currentGuessWord.word = word;
            CONFIG.currentGuessWord.wrongGuessCountOfCurrentWord = wrongGuessCountOfCurrentWord;
            // makeAGuess();
        }
    }


}


/**
 * 思路：先获取单词的length ,只过滤剩下掉指定长度的word,然后这些word里面循环判断26个字母哪个字母的出现频率最高（同一个字母中重复字符忽略不计数）
 *
 * 获取最可能的字符
 */
function getBestMatchChar() {
    let {currentGuessWord, allWordsArray}=CONFIG;
    let {word, totalWordCount}=currentGuessWord;
    let wordLength = word.length;
    let allWordsArrayAfterSpecifyLenth = allWordsArray.filter((v)=> {
        return v.trim().length == wordLength && v.trim().indexOf("'") == -1;
    })
    logger.info(`第${totalWordCount}个单词: 先按照长度为 ${wordLength}　的英文单词过滤，过滤后共剩下 ${allWordsArrayAfterSpecifyLenth.length}个`);

    let objCount = {};
    allWordsArrayAfterSpecifyLenth.map((item)=> {
        let s = new Set();
        for (let i in item) {
            s.add(item[i]);
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
    return mostPossibleChar;
}

/**
 * handle error message
 * @param e
 */
function handleError(...theArgs) {

    let msgAll = theArgs.map((item)=> {
        let msg;
        let type = typeof item;
        switch (type) {
            case 'object':
                msg = JSON.stringify(item);
                break;
            default:
                msg = item;
        }
        return msg;
    })

    console.error(msgAll);
}

/**
 * 读取预制的英文字典数据
 */
async function getAllWords() {
    let data = await readFile('./wordsEn.txt');
    let data2str = data.toString();
    let wordsArray = data2str.split('\r\n');
    CONFIG.allWordsArray = wordsArray;
}


main();
