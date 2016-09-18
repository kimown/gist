


## Introduction
- 为了使程序24h运行，使用[pm2管理](https://github.com/Unitech/pm2)
- 在后端使用最新的ES7特性，使用[babel-register](https://babeljs.io/docs/usage/require/)
- 整体思路：使用一个单词字典，首先根据长度过滤单词，找到出现频率(统一单词重复单词只计数一次)最高的字符，如果单词猜测正确，根据已知的字符过滤下单词字典，如果单词猜测错误，排除掉所有含有错误字符的单词，
然后重新统计字符的频率
- 如果发送次数大于20次，下一个单词；如果错误次数超过限定值，下一个单词




## Installation

``` bash
cd /tmp
git clone git@github.com:kimown/gist.git
cd gist/
npm i
cd hangman-game/
npm run pm2
```

