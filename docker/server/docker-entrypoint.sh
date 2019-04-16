#!/bin/bash

cd /var/www/course-app-server

if [ ! -d /var/www/course-app-server/node_modules ]; then
  npm cache clean -f  &&  npm install
fi;

npm start
