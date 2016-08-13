# Home Automation - Rasberry Pi LED
This package is being used by the [home automation project][overview-url].
The package controls the LED (Light-Emitting Diode) state.
  
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![DevDependencies][dependencies-dev-image]][dependencies-dev-url]
[![JavaScript Style Guide][standard-image]][standard-url]

## Installation (via [npm](https://www.npmjs.com/package/raspberry-pi-led))

```bash
$ npm install --save raspberry-pi-led
```

## Usage

This package uses [Bluebird's promises][promise-url].  It supports ES5 or later.  
The following example uses ES6 features.  

```javascript
const LED = require('raspberry-pi-led')

const led = new LED('My red led', 15)
led.initialize()
  .then(() => led.turnOn())
  .then(() => led.turnOff())
```

### License
[AGPL-3.0](https://spdx.org/licenses/AGPL-3.0.html)

### Author
[Oron Nadiv](https://github.com/OronNadiv) ([oron@nadiv.us](mailto:oron@nadiv.us))

[dependencies-image]: https://david-dm.org/OronNadiv/raspberry-pi-led/status.svg
[dependencies-url]: https://david-dm.org/OronNadiv/raspberry-pi-led
[dependencies-dev-image]: https://david-dm.org/OronNadiv/raspberry-pi-led/dev-status.svg
[dependencies-dev-url]: https://david-dm.org/OronNadiv/raspberry-pi-led?type=dev
[travis-image]: http://img.shields.io/travis/OronNadiv/raspberry-pi-led.svg?style=flat-square
[travis-url]: https://travis-ci.org/OronNadiv/raspberry-pi-led
[coveralls-image]: http://img.shields.io/coveralls/OronNadiv/raspberry-pi-led.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/OronNadiv/raspberry-pi-led
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com
[npm-image]: https://badge.fury.io/js/raspberry-pi-led.svg
[npm-url]: http://badge.fury.io/js/raspberry-pi-led

[overview-url]: https://oronnadiv.github.io/home-automation
[promise-url]: http://bluebirdjs.com/
