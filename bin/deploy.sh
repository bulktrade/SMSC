#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    echo "<settings><servers><server><id>ossrh</id><username>\${env.OSSRH_USER}</username><password>\${env.OSSRH_PASS}</password></server><server><id>docker-hub</id><username>\${env.DOCKER_USERNAME}</username><password>\${env.DOCKER_PASSWORD}</password><configuration><email>\${env.DOCKER_EMAIL}</email></configuration></server></servers></settings>" > ~/settings.xml

    # Heroku deploy
	mvn heroku:deploy -PskipBuildAndTests

    # Docker build & push
    mvn docker:build --settings ~/settings.xml -DpushImage -PskipBuildAndTests

    # Release to public repository
#	mvn release:clean release:prepare release:perform --settings ~/settings.xml -PskipBuildAndTests
fi