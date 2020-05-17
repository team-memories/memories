#!/usr/bin/env bash
TAG=b0.1 && \
docker build . -t main_api_server:${TAG} && \
source media_enhancement_module/build.sh