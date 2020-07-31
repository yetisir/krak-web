#!/bin/sh
if [ "$NODE_ENV" = "production" ]; then
    yarn global add serve;
    yarn build;
fi