/**
 * Created by google on 16-10-27.
 */

'use strict';

let a;

function test(temp) {
    a = temp;
    setInterval(function () {
        console.log(a);
    },1000)
}


exports.test = test;