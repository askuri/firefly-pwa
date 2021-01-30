#!/bin/bash
ng build --prod
cd src/workbox
npx webpack --config webpack.config.js
workbox injectManifest
