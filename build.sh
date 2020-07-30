#!/bin/sh
if [ "$NODE_ENV" = "production" ]; then
    yarn global add serve;
    echo "$(printenv)" >.env
    yarn build;
fi