var HtmlWebpackPlugin = require('html-webpack-plugin');


function generateConfig(envArgs) {
  console.info(envArgs.module)
  console.info(envArgs.test)
  return {
    entry: './app.js',
    output: {
      filename: '[name].[hash].[id].bundle.js',
      publicPath: 'https://cdn.example.com/assets22333/'
    },
    module: {
      loaders: [
        { test: /\.ejs$/, loader: 'ejs-loader' }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.ejs',
        env:'development233'
      })
    ]
  }
}

function buildConfig(envArgs) {
  checkEnvArgs(envArgs)
  return generateConfig(envArgs)
}


function checkEnvArgs(envArgs) {
  const keys = ['module', 'env'];
  keys.map((key)=>{
    const value = envArgs[key];
    if(!value) {
      throw new Error(`环境参数 ${key} 不存在。npm run build --env.module=XXX --env.env=XXX`)
    }
  })
}

module.exports = buildConfig;

// npm run build -- --env.module=yh-weixin-mall23333 --env.test=test2333