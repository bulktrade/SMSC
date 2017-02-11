#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    echo "<settings><servers><server><id>ossrh</id><username>\${env.OSSRH_USER}</username><password>\${env.OSSRH_PASS}</password></server></servers></settings>" > ~/settings.xml

    # Heroku deploy
	mvn heroku:deploy -PskipBuildAndTests

    # Docker build & push
    docker login -e="$DOCKER_EMAIL" -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD";
    mvn -f modules/core docker:build --settings ~/settings.xml -DpushImage -PskipBuildAndTests

    # Release to public repository
#	mvn release:clean release:prepare release:perform --settings ~/settings.xml -PskipBuildAndTests
fi