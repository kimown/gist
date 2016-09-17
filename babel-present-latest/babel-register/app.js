/**
 *
 * 1.read file
 * 2.filter all the words contain a specify character
 * 3.write the filtered words to /tmp/words
 *
 *
 * Created by kimown on 16-9-14.
 */


'use strict';

let {readFile, writeFile, os}= require('./../../util');

const CONFIG = {
    readPath: '/usr/share/dict/words',
    writePath: '/tmp/words',
    wordContainned: getRandomChar()
}


async function main() {
    let {readPath, writePath, wordContainned}=CONFIG;
    let {EOL}=os;
    try {
        let data2str = await readFile(readPath);
        let wordsArray = data2str.split(EOL);
        console.log(`过滤出包含字母${wordContainned}的所有单词,文件地址:${writePath}`);
        let wordsArrayAfterFilter = wordsArray.filter((word)=> {
            return word.toLowerCase().includes(wordContainned);
        });
        writeFile(writePath, wordsArrayAfterFilter.join(EOL));
    } catch (e) {
        handleError(e);
    }

}
/**
 *
 * @returns {string}
 */
function getRandomChar() {
    let charCodeOfA = 'a'.charCodeAt(0);
    let charCodeOfZ = 'z'.charCodeAt(0);
    let charCode = getRandomNumber(charCodeOfA, charCodeOfZ);
    return String.fromCharCode(charCode);
}

/**
 *   http://stackoverflow.com/a/1527820/5074324
 *   左闭右闭，注意这里使用了Math.floor 向下取整而非其他方式
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}


/**
 * handle error message
 * @param e
 */
function handleError(e) {
    console.error(e);
}


main();