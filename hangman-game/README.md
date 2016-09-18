
## Usage　（For gist.zip　）
因为单词词典下载速度很慢，所以zip包里面已经包含好了字典文件
``` bash
$ unzip gist.zip
$ cd gist/
$ npm i --registry=https://registry.npm.taobao.org
$ cd hangman-game/
$ node index.js

```










## Introduction
- 为了使程序24h运行，使用[pm2管理](https://github.com/Unitech/pm2)
- 在后端使用最新的ES7特性，使用[babel-register](https://babeljs.io/docs/usage/require/)
- 整体思路：使用一个单词字典，首先根据长度过滤单词，找到出现频率(一个单词内重复字符只计数一次)最高的字符，如果字符猜测正确，根据已知的字符过滤下单词字典，如果字符猜测错误，排除掉所有含有错误字符的单词，
然后重新统计单词字典中字符的频率
- 如果发送次数大于20次，下一个单词；如果错误次数超过限定值，下一个单词

For More,[Click Here](https://kimown.github.io/2016/09/18/hangman%E4%BB%A3%E7%A0%81%E6%95%B4%E4%BD%93%E6%80%9D%E8%B7%AF/)




## Installation


### First, Download code and 

``` bash
cd /tmp
git clone git@github.com:kimown/gist.git
cd gist/
npm i
cd hangman-game/
```
### Then, You need to download a english dictionay
``` bash
wget http://dumps.wikimedia.org/enwiktionary/latest/enwiktionary-latest-all-titles-in-ns0.gz

// check the md5 of the downloded filehttps://dumps.wikimedia.org/enwiktionary/latest/enwiktionary-latest-md5sums.txt
md5sum enwiktionary-latest-all-titles-in-ns0.gz

gunzip enwiktionary-latest-all-titles-in-ns0.gz
node common/script_index.js
```

Wait some seconds,You will see a file named 'enwiktionary-latest-all-titles-in-ns0-filter.txt' generated ,The project directory structure is
``` bash
$ tree /tmp/gist/hangman-game/
├── app.js
├── common
│   ├── config.json
│   ├── config-path.js
│   ├── index.js
│   ├── init-user-data.js
│   ├── operate-user-data.js
│   ├── script_index.js
│   └── scripts.js
├── enwiktionary-latest-all-titles-in-ns0
├── enwiktionary-latest-all-titles-in-ns0-filter.txt
├── index.js
├── package.json
└── README.md

1 directory, 13 files

```



### Change the config file
``` bash
cd common/
vi config.json //CHANGE THE CONFIG OF YOUR'S
{
  "requestUrl": "http://www.domain-name.com/game/on",
  "playerId": "test@example.com"
}

```

### Run the code

``` bash
cd /tmp/gist/hangman-game/
``` bash
node index.js
```

If you want run code forever,use

``` bash
cd /tmp/gist/hangman-game/
npm install pm2 -g
npm run pm2
```


