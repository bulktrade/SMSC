#!/usr/bin/env bash
set -e

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    openssl aes-256-cbc -K $encrypted_c5c9d3eefa3c_key -iv $encrypted_c5c9d3eefa3c_iv -in codesigning.asc.enc -out codesigning.asc -d
    gpg --fast-import signingkey.asc

    # Raise the version
    mvn -B clean deploy --settings sonatype-settings.xml -Prelease
else
    mvn -B clean install
fi

# Docker login
docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD";

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Docker build
    mvn -B -f modules/core docker:build -DpushImage -PskipBuildAndTests
fi

if [ "$TRAVIS_BRANCH" != "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Docker build
    DOCKER_IMAGE_TAG=${TRAVIS_BRANCH//\//-}
    mvn -B -f modules/core docker:build -PskipBuildAndTests -DdockerImageTags=${DOCKER_IMAGE_TAG//release-/}
fi
