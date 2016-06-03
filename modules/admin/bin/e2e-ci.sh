#!/bin/bash
set +e
npm run orientdb:dev:clean
npm run orientdb:dev
set -e

npm run start > webpack.log 2>&1&

while [ ! grep "[default] Ok,\|npm ERR!" webpack.log ]; do
     echo -n "."
done

rm webpack.log

npm run protractor

set +e
npm run orientdb:dev:clean
killall node
killall npm
set -e
