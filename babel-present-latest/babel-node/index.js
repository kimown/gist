/**
 * 1.read file
 * 2.filter all the words of specify length
 * 3.write the filtered words to /tmp/words
 *
 *
 * Created by kimown on 16-9-13.
 */
'use strict';

let {readFile, writeFile, os}= require('./../../util');

const CONFIG = {
    readPath: '/usr/share/dict/words',
    writePath: '/tmp/words',
    wordLength: 15
}


async function main() {
    let {readPath, writePath}=CONFIG;
    let {EOL}=os;
    try {
        let data = await readFile(readPath);
        let data2str = data.toString();
        let wordsArray = data2str.split(EOL);
        let wordLength = getRandomLength();
        console.log(`过滤出长度为${wordLength}的所有单词,文件地址:${writePath}`);
        let wordsArrayAfterFilter = wordsArray.filter((word)=> {
            return word.length == wordLength
        })
        writeFile(writePath, wordsArrayAfterFilter.join(EOL));
    } catch (e) {
        handleError(e);
    }

}

function getRandomLength() {
    let {wordLength}=CONFIG;
    return Math.round(Math.random() * wordLength + 1)
}


/**
 * handle error message
 * @param e
 */
function handleError(e) {
    console.error(e);
}


main();

