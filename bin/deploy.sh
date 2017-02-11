#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Heroku deploy
	mvn heroku:deploy -PskipBuildAndTests

    # Docker build & push
    mvn -f modules/core docker:build --settings ~/docker-settings.xml -DpushImage -PskipBuildAndTests

    # Release to public repository
#	mvn --settings sonatype-settings.xml -PskipBuildAndTests -B deploy
fi