#!/bin/bash
set +e
npm run orientdb:dev:clean
npm run orientdb:dev
npm run start > /dev/null 2>&1&
sleep 60
set -e

npm run protractor

set +e
npm run orientdb:dev:clean
killall node
killall npm
set -e
