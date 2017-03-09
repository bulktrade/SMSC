#!/usr/bin/env bash

mvn -B -DrepoToken=$COVERALLS_REPO_TOKEN clean test cobertura:cobertura coveralls:report org.jacoco:jacoco-maven-plugin:prepare-agent sonar:sonar com.gavinmogan:codacy-maven-plugin:coverage -DcoverageReportFile=target/site/cobertura/coverage.xml -DprojectToken=$CODACY_PROJECT_TOKEN -DapiToken=$CODACY_API_TOKEN -Dmaven.exec.skip=true -DskipITs
