#!/bin/bash
set -x
set -e

export ADMIN_ORIENTDB_URL=http://localhost:24080
export ADMIN_ORIENTDB_DATABASE=smsc
export EMBEDDED_ORIENTDB_ENABLED=1
export ORIENTDB_HTTP_PORT_RANGE=24080-24080

mvn clean install

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
	mvn heroku:deploy -Dmaven.test.skip=true -Dmaven.integration-test.skip=true -Dmaven.javadoc.skip=true
fi
