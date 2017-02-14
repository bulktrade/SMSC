#!/bin/bash
set -e
mvn clean install

# Docker login
docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD";

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Docker build
    mvn -f modules/core docker:build -Dmaven.exec.skip=true
fi

if [ "$TRAVIS_BRANCH" != "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Docker build 
    mvn -f modules/core docker:build -Dmaven.exec.skip=true -DdockerImageTags=${TRAVIS_BRANCH//\//-}
fi
