const debug = require('debug')
const diehard = require('diehard')
const Promise = require('bluebird')
const piGpio = require('pi-gpio')

const gpio = Promise.promisifyAll(piGpio)

const info = debug('raspberry-pi-led:index:info')

class LED {
  constructor (name, pin) {
    this.name = name || `LED pin: ${pin}`
    this.pin = pin
  }

  turnOff () {
    return this.pin < 0
      ? Promise.resolve()
      : gpio.writeAsync(this.pin, 0)
  }

  turnOn () {
    return this.pin < 0
      ? Promise.resolve()
      : gpio.writeAsync(this.pin, 1)
  }

  initialize () {
    const self = this

    return self.pin < 0
      ? Promise.resolve()
      : gpio.openAsync(self.pin, 'output')
        .then(() => {
          info('opened.', self.name)
          diehard.register(done => {
          /* istanbul ignore next */
            info('closing', self.name)
            /* istanbul ignore next */
            gpio.close(self.pin, () => {
              info('closed', self.name)
              done()
            })
          })
        })
  }
}

module.exports = LED
