FROM node:14.2-stretch

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . ./

CMD npm run serve
