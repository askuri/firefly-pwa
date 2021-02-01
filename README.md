# FireflyPwa
This project is experimental. I'm practicing Angular and Workbox here. Currently, not aimed at a wider audience.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
No explicit build required.

## Production build
Run `build-prod.sh`

## Production server
Currently, no dependency added. Just spawn any webserver inside /dist/firefly-pwa after building.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Architecture

### Service Worker
Used this tutorial to integrate workbox into Angular: https://medium.com/runic-software/simple-guide-to-workbox-in-angular-197c25396e68

However, it didn't fully work. Following things were done differently:
- Installation:
  - don't install webpack, only webpack-cli. Otherwise errors will arise during build.
  - also, I omitted the -D.
- Webpack build command: provided command seams invalid, I use this one: `npx webpack --config webpack.config.js`
