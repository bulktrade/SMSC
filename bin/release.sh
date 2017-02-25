#!/bin/bash

# Raise the version
mvn release:clean release:prepare
# release:perform --settings sonatype-settings.xml