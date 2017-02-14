#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Heroku deploy
	mvn heroku:deploy -PskipBuildAndTests

    # Docker build & push
    docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD";
    mvn -f modules/core docker:build -DpushImage -Dmaven.exec.skip=true

    # Release to public repository
    mvn --settings sonatype-settings.xml -PskipBuildAndTests -B deploy
fi

if [ "$TRAVIS_BRANCH" != "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Docker build & push
    docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD";
    mvn -f modules/core docker:build -Dmaven.exec.skip=true -DpushImageTags -DdockerImageTags=${TRAVIS_BRANCH//\//-}
fi
