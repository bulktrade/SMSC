#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Heroku deploy
	mvn heroku:deploy -PskipBuildAndTests

    # Docker push
    mvn -f modules/core docker:push -Dmaven.exec.skip=true

    # Raise the version
    #mvn release:clean
    #mvn release:prepare
    #mvn release:perform

    # Release to public repository
    mvn --settings sonatype-settings.xml -PskipBuildAndTests -B deploy
fi

if [ "$TRAVIS_BRANCH" != "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Docker push for feature branches
    docker push smscio/smsc:${TRAVIS_BRANCH//\//-}
fi
