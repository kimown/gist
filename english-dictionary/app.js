/**
 * Created by kimown on 16-9-14.
 */


'use strict';
let {requestUrl, playerId}=require('./../tmp/config.json');
let {request, logger}= require('./../util');


const CONFIG = {
    action: {
        startGame: 'startGam1e'
    },
    requestUrl,
    playerId,
    sessionId: null
};


async function main() {

    let data = await startGame();
    console.log(data);
    // try {
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
        "action": CONFIG.action.startGame
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
        logger.info(`message:${message},您的身份标示是${sessionId},您一共要猜测${numberOfWordsToGuess}个单词,每个单词限制猜测${numberOfGuessAllowedForEachWord}次`);     // console.info
    } else {
        logger.error(`启动游戏失败!!!失败原因:`, res.body);
    }
    return data;
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

function logger() {

}


main();
