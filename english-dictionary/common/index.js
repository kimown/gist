/**
 * Created by kimown on 16-9-16.
 */

'use strict';
// let initUserData=require('./init-user-data');

let {
    readUserData,
    writeUserData
}= require('./operate-user-data');



module.exports={
    readUserData,
    writeUserData,
    // initUserData
};