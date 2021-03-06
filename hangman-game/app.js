/**
 * Created by kimown on 16-9-14.
 */


'use strict';
let configPath = require('./common/config-path');
let {request, rmFileSync}= require('./../util');
let logger = require('./../logger');
let loggerfile = require('./../loggerfile')();
let scoreLoggerfile = require('./../loggerfile')(configPath.scoreLogFilePath);

let {writeUserData, readUserData}=require('./common');


process.on('uncaughtException', (err) => {
    console.log(err);
});

process.on('exit', (code) => {
    //TODO 如果程序异常退出且 totalWordCount 没有达到 一共要猜测的单词数量 ,保存用户数据
    saveUserDataSync();
    console.log(`程序退出了About to exit with code: ${code}`);
});

let CONFIG = {};


async function main() {

    //里面保存了所有的用户数据．
    CONFIG = await readUserData();

    if (CONFIG.hasOwnProperty('sessionId') && CONFIG.sessionId) {
        //断线重玩游戏
        await makeAGuess();
    } else {
        //new 一个game
        await startGame();
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

    let isArriveLimitWords = checkArriveLimitWords();
    if (isArriveLimitWords) {

        //　查询分数，退出程序．
        await operationBeforeExit();
    } else {
        //　向服务器请求单词
        await sendRequireNextWordRequest();
    }
}

async function sendRequireNextWordRequest() {
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
async function operationBeforeExit() {
    await GetYourResult();
    initCurrentGuessWordStatus();
    processExit();
}


/**
 * 3.Make A Guess
 * https://github.com/strikingly/strikingly-interview-test-instructions#3-make-a-guess
 * 猜测当前的单词
 */
async function makeAGuess() {

    let isNeedNextWord = checkNeedNextWord();

    if (isNeedNextWord) {
        initCurrentGuessWordStatus();
        await GiveMeAWord();
    } else {
        let mostPossibleChar = getBestMatchChar();
        if (mostPossibleChar == 'fail') {
            initCurrentGuessWordStatus();
            await GiveMeAWord();
            return;
        }

        //发送最可能的字符　作为请求　
        let res = await sendMostPossibleCharToServer(mostPossibleChar);

        //更新状态
        setCurrentGuessStatus(res);

        //如果字符没有猜对
        if (!checkGuessCorrect(mostPossibleChar)) {
            CONFIG.currentGuessWord.alreadyConfirmWrongCharAr.push(mostPossibleChar);
        }

        if (!checkWordCotainAsterisks()) {
            //单词猜测正确
            loggerfile.info(`----------------------------------第${CONFIG.currentGuessWord.totalWordCount}个单词猜测成功，答案是 ${CONFIG.currentGuessWord.word} --------------------------`);
            await wordHasGuessedOperation();
        } else {
            //如果单词没有全部猜对，递归调用猜词方法
            await makeAGuess();
        }
    }
}


async function sendMostPossibleCharToServer(mostPossibleChar) {

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

    return res;
}

/**
 * 检查发送的字符是否正确
 */
function checkGuessCorrect(mostPossibleChar) {
    let {currentGuessWord}=CONFIG;
    let {word}=currentGuessWord;
    return word.includes(mostPossibleChar)
}

/**
 * 是否需要下一个单词 ,默认走正常猜词流程
 */
function checkNeedNextWord() {
    let flag = false;
    let {currentGuessWord, numberOfGuessAllowedForEachWord}=CONFIG;
    let {wrongGuessCountOfCurrentWord, word, totalWordCount, currentGuessCount}=currentGuessWord;


    //如果正在猜测的错误次数超过允许猜测的最大次数 或者　超过20次　
    if (wrongGuessCountOfCurrentWord >= numberOfGuessAllowedForEachWord) {
        loggerfile.error(`第${totalWordCount}个单词: 第${currentGuessCount}次猜测, 猜错次数已经达到默认上限 ${numberOfGuessAllowedForEachWord} ，开始下一轮.......failing`);
        flag = true;
    } else if (currentGuessCount > 20) {
        loggerfile.error(`第${totalWordCount}个单词: 第${currentGuessCount}次猜测, 猜测次数已经超过 20　 ，开始下一轮.......failing`);
        flag = true;
    }
    logger.info('\n\n');
    logger.info(`第    ${totalWordCount}    个单词: 第    ${currentGuessCount}    次猜测,单词内容是第    ${word}    ,已经猜错了第    ${wrongGuessCountOfCurrentWord}    次(${numberOfGuessAllowedForEachWord})`);
    return flag;
}

function checkArriveLimitWords() {
    let {currentGuessWord, numberOfWordsToGuess}=CONFIG;
    let {totalWordCount}=currentGuessWord;
    //如果正在猜的单词数等于一共要猜测的单词数量，GAME OVER,查询分数
    if (totalWordCount > numberOfWordsToGuess) {
        return true;
    }
    return false;
}

/**
 * 如果猜中了单词，一些后续操作
 * -　从整体的单词库里面删除这个单词　
 *
 */
async function wordHasGuessedOperation() {
    let {allWordsArray, currentGuessWord}=CONFIG;
    let {word}=currentGuessWord;
    CONFIG.wordsHasGuessed.push(word);

    //allWordsArray 里面删除这个单词
    let positiion = allWordsArray.indexOf(word);
    if (positiion != -1) {
        CONFIG.allWordsArray.splice(positiion, 1);
        loggerfile.info(`-----　删除 ${word} 后剩余 ${CONFIG.allWordsArray.length}　个单词　------`);
    }
    initCurrentGuessWordStatus();
    await GiveMeAWord();
}

/**
 *
 * 4. Get Your Result
 */
async function GetYourResult() {
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

    scoreLoggerfile.info(`最后得分`, res);
}

function processExit() {
    loggerfile.info(`主动退出程序，游戏结束,之后pm2会自动重启,然后开启新一轮的游戏`);
    //删除data.json
    let {userDataPath}=configPath;
    rmFileSync(userDataPath);
}

/**
 * 初始化当前猜词状态
 */
function initCurrentGuessWordStatus() {
    let {currentGuessWord}=CONFIG;
    currentGuessWord.word = null;
    currentGuessWord.alreadyConfirmWrongCharAr = [];
    currentGuessWord.currentGuessCount = 1;
    currentGuessWord.alreadyRequestCharAr = [];
    currentGuessWord.alreadyConfirmWrongCharAr = [];
    //重点是这个猜词的个数+1
    currentGuessWord.totalWordCount = ++currentGuessWord.totalWordCount;
    currentGuessWord.wrongGuessCountOfCurrentWord = 0;
}

/**
 * 判断单词是否含有*号
 */
function checkWordCotainAsterisks() {
    let {currentGuessWord}=CONFIG;
    let {word}=currentGuessWord;
    return word.includes('*');
}


/**
 * 判断单词中是否全部都是*号
 */
function checkWordAllAsterisks() {
    let {currentGuessWord}=CONFIG;
    let {word}=currentGuessWord;
    return word.split('').every((v)=> {
        return v == '*'
    })
}

/**
 * 响应更新当前的猜词状态
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
    }
}


/**
 * 思路：先获取单词的length ,只过滤剩下掉指定长度的word,然后这些word里面循环判断26个字母哪个字母的出现频率最高（同一个字母中重复字符忽略不计数）
 *
 * 获取最可能的字符
 */
function getBestMatchChar() {
    let {currentGuessWord, allWordsArray}=CONFIG;
    let {word, totalWordCount, alreadyRequestCharAr, alreadyConfirmWrongCharAr}=currentGuessWord;


    let allWordsArrayAfterFilter = allWordsArray.filter((v)=> {
        return wordFilterCondition(v, word, alreadyConfirmWrongCharAr)
    });

    //如果过滤后，没有找到对应的单词,放弃这一轮，走猜测下一个单词
    if (allWordsArrayAfterFilter.length == 0) {
        return 'fail';
    }


    //　统计剩余单词中字符的出现频率
    let objCount = analyseOccurenceOfWordAr(allWordsArrayAfterFilter, alreadyRequestCharAr);


    let mostOccurenceChar = getMostOccurenceChar(objCount);
    logger.info(`第    ${totalWordCount}    个单词:  错误字符：${alreadyConfirmWrongCharAr.toString()}    过滤后共剩下    ${allWordsArrayAfterFilter.length}    个 ,出现频率最高的字符是     ${mostOccurenceChar}`);


    CONFIG.currentGuessWord.alreadyRequestCharAr.push(mostOccurenceChar);

    return mostOccurenceChar;
}
/**
 * 统计出息那最多的字符.set结构
 * @param objCount
 * @returns {*}
 */
function getMostOccurenceChar(objCount) {
    let maxKey;
    for (let i in objCount) {
        if (!maxKey) {
            maxKey = i;
        } else if (maxKey && objCount[maxKey] < objCount[i]) {
            maxKey = i;
        }
    }
    //TODO 如果没有匹配的字符，这里应该使用一个随机字符
    if (!maxKey) {
        return 'E';
    }
    return maxKey.toUpperCase();
}


/**
 * 统计单词数组总所有字符的出现频率，不统计已发送请求中的字符
 */
function analyseOccurenceOfWordAr(allWordsArrayAfterFilter, alreadyRequestCharAr) {
    let objCount = {};
    allWordsArrayAfterFilter.map((item)=> {
        item = item.toUpperCase();
        let s = new Set();
        for (let i in item) {
            //如果是已经发送的猜测字符，那么下一次不继续发送了
            if (!alreadyRequestCharAr.includes(item[i].toUpperCase())) {
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

    return objCount;
}

/**
 * 单词的过滤条件
 * @param word 每次循环的一行一个单词
 */
function wordFilterCondition(word, currentWord, alreadyConfirmWrongCharAr) {
    let wordToUpperCase = word.toUpperCase();

    //先按照长度过滤
    if (wordToUpperCase.length != currentWord.length) {
        return false;
    }

    //按照猜对的字符过滤
    if (!checkWordAllAsterisks()) {
        if (!checkByCorrectCharAr(wordToUpperCase, currentWord)) {
            return false;
        }
    }

    //按照猜错的字符过滤
    if (alreadyConfirmWrongCharAr.length > 0) {
        if (checkStrContainSomeCharAr(wordToUpperCase, alreadyConfirmWrongCharAr)) {
            return false;
        }
    }


    return true;
}

/**
 * 按照猜对的字符除了＊号外一一对应
 * @param wordToUpperCase
 * @param currentWord
 * @returns {boolean}
 */
function checkByCorrectCharAr(wordToUpperCase, currentWord) {
    let flag = true;
    currentWord.split('').map((singleChar, k)=> {
        if (singleChar != '*') {
            if (wordToUpperCase[k] != singleChar) {
                flag = false;
            }
        }
    })
    return flag;
}

/**
 * 监测单词里面是否含有某些字符数组的某些元素.
 * 默认都不存在
 * @param str
 * @param charAr
 */
function checkStrContainSomeCharAr(str, charAr) {
    let flag = false;
    charAr.map((char)=> {
        if (str.includes(char)) {
            flag = true;
        }
    })
    return flag;
}


function saveUserDataSync() {
    let isArriveLimitWords = checkArriveLimitWords();
    if (isArriveLimitWords) {
        CONFIG.allWordsArray = null;
        writeUserData(JSON.stringify(CONFIG, null, 2));
    }
}


main();
