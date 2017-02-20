#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ] ; then
  mvn -DrepoToken=$COVERALLS_REPO_TOKEN cobertura:cobertura coveralls:report org.jacoco:jacoco-maven-plugin:prepare-agent sonar:sonar -Dmaven.exec.skip=true -DskipITs
  mvn com.gavinmogan:codacy-maven-plugin:coverage -DcoverageReportFile=target/site/cobertura/coverage.xml -DprojectToken=$CODACY_PROJECT_TOKEN -DapiToken=$CODACY_API_TOKEN -PskipBuildAndTests
fi
