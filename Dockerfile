FROM node:14.2-stretch

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . ./

ARG NODE_ENV=${NODE_ENV}
# RUN ./build.sh ${NODE_ENV}

CMD [ "./run.sh", ${NODE_ENV} ]

