#FROM node:argon
#FROM risingstack/alpine:3.3-v4.2.6-1.1.3

FROM alpine:latest	
RUN apk add --update nodejs




# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# install app dependencies
COPY package.json /usr/src/app
RUN npm i --registry=https://registry.npm.taobao.org


# bundle app source
COPY . /usr/src/app

EXPOSE 8080

CMD ["npm","start"]
