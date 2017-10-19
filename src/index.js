const debug = require('debug')
const diehard = require('diehard')
const Promise = require('bluebird')
const piGpio = require('pi-gpio')
const isNumber = require('lodash.isnumber')

const gpio = Promise.promisifyAll(piGpio)

const info = debug('raspberry-pi-led:index:info')

class LED {
  constructor ({name, pin}) {
    if (!isNumber(pin) || pin < 0) {
      throw new Error('Invalid pin argument.  Expected number >= 0.')
    }
    this.name = name || `LED pin: ${pin}`
    this.pin = pin
  }

  turnOff () {
    return gpio.writeAsync(this.pin, 0)
  }

  turnOn () {
    return gpio.writeAsync(this.pin, 1)
  }

  initialize () {
    const self = this

    return gpio.openAsync(self.pin, 'output')
      .then(() => {
        info('opened.', self.name)
        diehard.register(
          /* istanbul ignore next */
          (done) => {
            info('closing', self.name)
            gpio.close(self.pin, () => {
              info('closed', self.name)
              done()
            })
          })
      })
  }
}

module.exports = LED
