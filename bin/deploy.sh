#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Docker push
    mvn -f modules/core docker:push -DpushImage -PskipBuildAndTests

    # Heroku deploy
    mvn heroku:deploy -PskipBuildAndTests

    # Raise the version
    #mvn release:clean
    #mvn release:prepare
    #mvn release:perform

    # Release to public repository
    mvn --settings sonatype-settings.xml -PskipBuildAndTests -B deploy
fi

if [ "$TRAVIS_BRANCH" != "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Docker push
    mvn -f modules/core docker:push -DpushImageTag -PskipBuildAndTests -DdockerImageTags=${TRAVIS_BRANCH//\//-}
fi
