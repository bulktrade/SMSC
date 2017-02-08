#!/bin/bash
set -x
set -e

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
	mvn clean heroku:deploy -Dmaven.test.skip=true -Dmaven.integration-test.skip=true -Dmaven.javadoc.skip=true
else
	mvn clean install
fi
