/**
 *
 * 用户游戏数据的读写操作
 * Created by kimown on 16-9-16.
 */

'use strict';

let {readFile,writeFileSync}= require('./../../util');

/**
 * 读取用户数据，主要是为了断线重连
 *
 */
async function readUserData() {

}


/**
 * 保存用户数据
 *
 * - 断线
 * - 程序异常退出　
 * - 玩家突然不想完了
 */

function writeUserData(data) {
    console.log('------保存用户数据至data.json文件-------');
    writeFileSync('data.json',data);

}

module.exports={
 readUserData,
 writeUserData
};
