#!/bin/bash
set -x
set -e

mvn -DrepoToken=$COVERALLS_REPO_TOKEN cobertura:cobertura coveralls:report org.jacoco:jacoco-maven-plugin:prepare-agent sonar:sonar versioneye:update -Dmaven.test.skip=true -Dmaven.integration-test.skip=true -Dmaven.javadoc.skip=true