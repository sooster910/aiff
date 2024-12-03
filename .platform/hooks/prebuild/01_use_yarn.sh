#!/bin/bash
if [ -f "yarn.lock" ]; then
  echo "Using Yarn for package management"
  npm install -g yarn
  yarn install
else
  echo "No yarn.lock found, falling back to npm"
  npm install
fi
