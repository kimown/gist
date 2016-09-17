/**
 *
 * 对字典进行一次过滤 ,一次性脚本.
 * Created by kimown on 16-9-17.
 */
'use strict';

let {readFile,path,writeFileSync}= require('./../../util');

const dictFilePath=path.join(__dirname,'enwiktionary-latest-all-titles-in-ns0');
const dictNewFilePath=path.join(__dirname,'enwiktionary-latest-all-titles-in-ns0-filter.txt');


async function main() {
    let allDict2str = await readFile(dictFilePath);
    let allDictArray = allDict2str.split('\n');
    console.log(`初始一共　${allDictArray.length} 个单词`);


    let allDictArrayAterFilter = filterAllDictArray(allDictArray);
    console.log(`按照a-zA-Z过滤后，共　${allDictArrayAterFilter.length} 个单词`);



    let dictArrayAfterFilterSameChar=filterAllDictArrayBySameChar(allDictArrayAterFilter);
    console.log(`将字符全部相同的单词过滤后，共　${dictArrayAfterFilterSameChar.length}　个单词`);

    writeFileSync(dictNewFilePath,dictArrayAfterFilterSameChar.join('\n').toString());

}


function filterAllDictArrayBySameChar(allDictArrayAterFilter) {
    let dictArray=allDictArrayAterFilter.filter((v)=>{
        return !checkIsSameChar(v);
    });
    return dictArray;
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
function checkIsSameChar(str) {
    let flag=true;


    let char;
    let loopFlag=true;
    str.split('').every((strItem)=>{
        if(!char){
            char=strItem;
        }else{
            if(strItem!=char){
                flag=false;
                loopFlag=false;
            }
        }
        return loopFlag;
    });


    return flag;
}

main();


