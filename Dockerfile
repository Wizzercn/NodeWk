FROM node:6.2
# Author
MAINTAINER wizzer "wizzer@qq.com"
ENV PORT 1337
RUN apt-get update && apt-get install -y \
		imagemagick \
	--no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /node/nodewk
WORKDIR /node/nodewk

RUN npm config set registry https://registry.npm.taobao.org
RUN npm i node-gyp -g
RUN npm i pm2 -g
ADD api /node/nodewk/api
ADD assets /node/nodewk/assets
ADD config /node/nodewk/config
ADD tasks /node/nodewk/tasks
ADD views /node/nodewk/views
ADD app.js /node/nodewk
ADD Gruntfile.js /node/nodewk
ADD package.json /node/nodewk
RUN npm i
EXPOSE ${PORT}
ENV LANG C.UTF-8
ENV TZ "Asia/Shanghai"
VOLUME ["/node/nodewk/cert", "/node/nodewk/upload", "/node/nodewk/backup"]
CMD [ "pm2", "start", "--no-daemon", "app.js" ]

