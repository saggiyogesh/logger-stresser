FROM node:20

# RUN apk --update add git

ENV PORT 80

ENV NODE_ENV production

WORKDIR /app

ADD . /app

RUN npm install

ENTRYPOINT npm start