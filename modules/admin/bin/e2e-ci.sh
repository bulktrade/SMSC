#!/bin/bash
#set +e
#npm run orientdb:dev:clean
#npm run orientdb:dev
#set -e
#
#npm run start&
#sleep 60

export DBUS_SESSION_BUS_ADDRESS=/dev/null

protractor

set +e
npm run orientdb:dev:clean
killall node
killall npm
set -e
