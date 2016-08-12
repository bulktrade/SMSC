#!/bin/bash
set -x
set -e

export EMBEDDED_ORIENTDB_ENABLED=1

mvn clean install

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
	mvn heroku:deploy -Dmaven.test.skip=true -Dmaven.integration-test.skip=true -Dmaven.javadoc.skip=true
fi