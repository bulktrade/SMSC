#!/bin/bash
set -e
mvn clean install

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Raise the version
    mvn release:clean release:prepare release:perform --settings sonatype-settings.xml
fi

# Docker login
docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD";

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Docker build
    mvn -f modules/core docker:build -DpushImage -PskipBuildAndTests
fi

if [ "$TRAVIS_BRANCH" != "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Docker build
    DOCKER_IMAGE_TAG=${TRAVIS_BRANCH//\//-}
    mvn -f modules/core docker:build -PskipBuildAndTests -DdockerImageTags=${DOCKER_IMAGE_TAG//release-/}
fi
