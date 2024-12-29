#!/bin/bash
set -e
echo "Starting Yarn installation in staging directory"

# 디렉토리 확인
if [ -d "/var/app/staging" ]; then
  echo "Staging directory exists"
else
  echo "Staging directory does not exist"
  exit 1
fi

# 디렉토리 이동
cd /var/app/staging
echo "Current directory: $(pwd)"

# Yarn 패키지 설치
yarn install --frozen-lockfile --production
echo "Yarn installation completed"
