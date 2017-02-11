#!/bin/bash
set -x

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Heroku deploy
	mvn heroku:deploy

    # Docker build & deploy
    docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD";
    mvn docker:build

    # Release to public repository
#	mvn release:clean release:prepare release:perform --settings ~/settings.xml
fi