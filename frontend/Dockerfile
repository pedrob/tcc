FROM node:16-alpine3.14

WORKDIR /web

COPY package.json yarn.lock ./

RUN yarn

ENTRYPOINT [ "yarn", "start" ]