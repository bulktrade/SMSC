#!/bin/bash

# Raise the version
mvn release:clean
mvn release:prepare
mvn release:perform