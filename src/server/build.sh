#!/usr/bin/env bash
TAG=b0.2 && \
docker build . -t main_api_server:${TAG} && \
cd media_enhancement_module && \
source build.sh && \
cd -