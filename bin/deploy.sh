#!/usr/bin/env bash

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Docker push
    mvn -B -f modules/core docker:push -DpushImage -PskipBuildAndTests

    # Heroku deploy
    mvn -B heroku:deploy -PskipBuildAndTests
fi

if [ "$TRAVIS_BRANCH" != "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Docker push
    DOCKER_IMAGE_TAG=${TRAVIS_BRANCH//\//-}
    docker push smscio/smsc:${DOCKER_IMAGE_TAG//release-/}
fi
