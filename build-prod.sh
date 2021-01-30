#!/bin/bash
ng build --prod # set environment for all parts except workbox
cd src/workbox
npx webpack --config webpack.config.js
workbox injectManifest
