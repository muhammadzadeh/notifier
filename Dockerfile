FROM node:16.14-alpine

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
ARG env_example
ENV env_example=$env_example

RUN cat $env_example > .env
RUN yarn cache clean && yarn install 
COPY . .
RUN yarn build
CMD [  "yarn", "run", "start:prod" ]
