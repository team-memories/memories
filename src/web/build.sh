#!/bin/sh

npm run build
rm -rf ../server/static
mv ./build/static ../server/
mv ./build/asset-manifest.json ../server/static/
mv ./build/favicon.ico ../server/static/
mv ./build/index.html ../server/static/
mv ./build/logo192.png ../server/static/
mv ./build/logo512.png ../server/static/
mv ./build/manifest.json ../server/static/
mv ./build/precache-manifest.* ../server/static/
mv ./build/robots.txt ../server/static/
mv ./build/service-worker.js ../server/static/
rm -rf ./build/
