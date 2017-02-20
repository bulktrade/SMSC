#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
  mvn -DrepoToken=$COVERALLS_REPO_TOKEN cobertura:cobertura coveralls:report org.jacoco:jacoco-maven-plugin:prepare-agent sonar:sonar com.gavinmogan:codacy-maven-plugin:coverage -DcoverageReportFile=target/site/jacoco/jacoco.xml -DprojectToken=$CODACY_PROJECT_TOKEN -DapiToken=$CODACY_API_TOKEN -Dmaven.exec.skip=true -DskipITs
fi
