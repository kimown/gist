cp /etc/apt/sources.list /etc/apt/sources.list.bak
echo "">/etc/apt/sources.list
echo -e "deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse\ndeb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse\ndeb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse\ndeb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse\ndeb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse\ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse\ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse\ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse\ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse\ndeb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse">/etc/apt/sources.list
echo "change /etc/apt/sources.list to aliyun successfully"

apt-get clean
apt-get update
#apt-get upgrade

apt-get install wget -y
wget -O- https://raw.githubusercontent.com/aliyun-node/tnvm/master/install.sh | bash
source /root/.bashrc
tnvm ls-remote alinode
tnvm install alinode-v1.6.0
tnvm use     alinode-v1.6.0
echo "I am using alinode,version:=======>$(node -p 'process.alinode')<=========="
npm install npm -g --registry=https://registry.npm.taobao.org



#wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie"  "http://download.oracle.com/otn-pub/java/jdk/8u101-b13/jdk-8u101-linux-x64.tar.gz"
cd /home
mkdir mdk
cd mdk
wget http://mirrors.linuxeye.com/jdk/jdk-8u92-linux-x64.tar.gz
tar -xzvf jdk-8u92-linux-x64.tar.gz
echo -e "export JAVA_HOME=/home/mdk/jdk1.8.0_92\nexport PATH=\$JAVA_HOME/bin:\$PATH\nexport CLASSPATH=.:\$JAVA_HOME/lib">>/etc/profile
source /etc/profile
java -version
javac 1.8.0_92


# maven




