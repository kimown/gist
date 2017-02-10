/**
 * Created by google on 2/4/17.
 */


var conf = require('./promise.ecosystem.config');



// conf.then(function (confObj) {
//   resolve(confObj)
// })


function getPromise() {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.info('3 seconds');
      resolve({err:'服务异常，请重试', data: null})
    },3000)
  })
}


function getPromise2() {
  return getPromise().catch((e)=>{
    console.error('eee'+e);
  })
}

Promise.all([conf, getPromise2()]).then((data)=>{
  console.info(data)
}).catch((e)=>{
  console.info(e)
})

