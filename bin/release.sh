#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
    # Raise the version
    mvn release:clean release:prepare release:perform --settings sonatype-settings.xml
fi
