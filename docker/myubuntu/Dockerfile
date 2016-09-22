FROM ubuntu:trusty

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh


RUN cp /etc/apt/sources.list /etc/apt/sources.list.bak
RUN echo "">/etc/apt/sources.list
RUN echo "deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse">>/etc/apt/sources.list
RUN echo "deb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse">>/etc/apt/sources.list
RUN echo "deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse">>/etc/apt/sources.list
RUN echo "deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse">>/etc/apt/sources.list
RUN echo "deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse">>/etc/apt/sources.list
RUN echo "deb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse">>/etc/apt/sources.list
RUN echo "deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse">>/etc/apt/sources.list
RUN echo "deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse">>/etc/apt/sources.list
RUN echo "deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse">>/etc/apt/sources.list
RUN echo "deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse">>/etc/apt/sources.list
RUN echo "change /etc/apt/sources.list to aliyun successfully"

RUN apt-get clean
RUN apt-get update
#apt-get upgrade


ENV NVM_DIR /root/.tnvm

RUN apt-get install build-essential wget curl -y
#RUN cd /tmp
#RUN curl https://raw.githubusercontent.com/aliyun-node/tnvm/master/install.sh |bash \
#    && source $NVM_DIR/tnvm.sh \
#    && tnvm ls-remote alinode \
#    && tnvm install alinode-v1.6.0 \
#    && tnvm use     alinode-v1.6.0 \
#    && node -v \
#    && npm install npm -g --registry=https://registry.npm.taobao.org \
#    && npm -v



#wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie"  "http://download.oracle.com/otn-pub/java/jdk/8u101-b13/jdk-8u101-linux-x64.tar.gz"
# thank you ．．　https://bbs.aliyun.com/read/255213.html?pos=9
RUN mkdir -p /home/mdk
RUN wget http://mirrors.linuxeye.com/jdk/jdk-8u92-linux-x64.tar.gz -P /home/mdk
RUN tar -xzvf /home/mdk/jdk-8u92-linux-x64.tar.gz -C /home/mdk
RUN echo -e "export JAVA_HOME=/home/mdk/jdk1.8.0_92\nexport PATH=\$JAVA_HOME/bin:\$PATH\nexport CLASSPATH=.:\$JAVA_HOME/lib">>/etc/profile
RUN source /etc/profile

RUN echo -e "\n\n">>/etc/profile

# thank you .. http://mirrors.aliyun.com/apache/
# maven
RUN mkdir -p /home/mdk
RUN wget http://mirrors.aliyun.com/apache/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz -P /home/mdk
RUN tar -xzvf /home/mdk/apache-maven-3.3.9-bin.tar.gz -C /home/mdk
RUN echo -e "export M2_HOME=/home/mdk/apache-maven-3.3.9\nexport PATH=\$M2_HOME/bin:\$PATH">>/etc/profile
RUN source /etc/profile

# TODO  gradle






