FROM node:20

# RUN apk --update add git

RUN apt update && apt install stress

ENV PORT 80

ENV NODE_ENV production

WORKDIR /app

ADD . /app

# RUN wget https://ash-speed.hetzner.com/100MB.bin

RUN npm install

ENTRYPOINT npm start
