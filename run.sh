#!/bin/sh
if [ "$NODE_ENV" = "production" ]; then
    serve dist;
else 
    yarn dev;
fi