#!/bin/bash
mvn -DrepoToken=$COVERALLS_REPO_TOKEN cobertura:cobertura coveralls:report org.jacoco:jacoco-maven-plugin:prepare-agent sonar:sonar -PskipBuildAndTests