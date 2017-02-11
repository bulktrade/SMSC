#!/bin/bash
set -x

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Heroku deploy
	mvn heroku:deploy -PskipBuildAndTests

    # Docker build & deploy
    docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD";
    mvn docker:build -PskipBuildAndTests

    # Release to public repository
#	mvn release:clean release:prepare release:perform --settings ~/settings.xml -PskipBuildAndTests
fi