#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Docker push
    mvn -f modules/core docker:push -DpushImage -PskipBuildAndTests

    # Heroku deploy
    mvn heroku:deploy -PskipBuildAndTests

    # Release to public repository
    mvn --settings sonatype-settings.xml -PskipBuildAndTests -B deploy
fi

if [ "$TRAVIS_BRANCH" != "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Docker push
    DOCKER_IMAGE_TAG=${TRAVIS_BRANCH//\//-}
    docker push smscio/smsc:${DOCKER_IMAGE_TAG//release-/}
fi
