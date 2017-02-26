#!/bin/bash
set -e

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Raise the version
    mvn -B release:clean release:prepare release:perform --settings sonatype-settings.xml
else
    mvn clean install
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
