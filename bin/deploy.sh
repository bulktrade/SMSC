#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Heroku deploy
	mvn heroku:deploy -PskipBuildAndTests

    # Docker build & push
    docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD";
    mvn -f modules/core docker:build --settings ~/settings.xml -DpushImage -PskipBuildAndTests

    # Release to public repository
#	mvn --settings sonatype-settings.xml -PskipBuildAndTests -B deploy
fi