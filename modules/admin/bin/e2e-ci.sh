#!/bin/bash

npm run start > webpack.log 2>&1&

while [ ! grep "[default] Ok,\|npm ERR!" webpack.log ]; do
     echo -n "."
done

rm webpack.log

npm run protractor

set +e
killall node
killall npm
set -e
