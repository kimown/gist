/**
 *
 * 对字典进行一次过滤 ,一次性脚本.
 * Created by kimown on 16-9-17.
 */
'use strict';

let {readFile,path}= require('./../../util');

const dictFilePath=path.join(__dirname,'enwiktionary-latest-all-titles-in-ns0');


async function main() {
    let allDict2str = await readFile(dictFilePath);
    let allDictArray = allDict2str.split('\n');
    let dictArray = filterAllDictArray(allDictArray);
    return allDictArray;
    console.log(allDict);


}


/**
 * 过滤出字符，特殊字符除外
 */
function filterAllDictArray(allDictArray) {
    let charCodeOfA = 'a'.charCodeAt(0);
    let charCodeOfZ = 'z'.charCodeAt(0);

}

main();


