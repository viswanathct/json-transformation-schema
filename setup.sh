#!/bin/bash

set -e

# Init
cd $(dirname $0)

# Tasks
setupEnvironment() {
	hooksPath="./.githooks"

	git config core.hooksPath "$hooksPath"
	chmod 775 "$hooksPath"/*
}

installPackages() {

	npm install
}

# Main
setupEnvironment
installPackages
