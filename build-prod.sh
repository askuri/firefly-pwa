#!/bin/bash
ng build --prod # set environment for all parts except workbox, remove the parameter to do a normal build
cd src/workbox
npx webpack --config webpack.config.js
workbox injectManifest
