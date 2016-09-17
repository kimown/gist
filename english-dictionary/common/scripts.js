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
    let allDictArrayAterFilter = filterAllDictArray(allDictArray);

    return allDictArrayAterFilter;
}


/**
 * 过滤出字符，特殊字符除外
 */
function filterAllDictArray(allDictArray) {
    let charCodeOfA = 'a'.charCodeAt(0);
    let charCodeOfZ = 'z'.charCodeAt(0);
    let allDictArrayAterFilter=allDictArray.filter((v)=>{
        return v.search(/^[A-Za-z]+$/)!=-1;
    })
    return allDictArrayAterFilter;
}

function checkAllContainsChar(str) {
    let flag=true;
    let str2Ar=str.split()
    var a='11111afsdfasdfag';
    for(let i in a){

    }
}

/**
 * 判断是不是字符，不区分大小写
 * @param char
 * @returns {boolean}
 */
function checkIsChar(char) {
    let flag=false;
    if(('a'<=char&&char<='z' )|| ('A'<=char&&char<='Z')){
        flag=true;
    }
    return flag;
}

main();


