const debug = require('debug')
const diehard = require('diehard')
const gpio = require('rpi-gpio')
const gpiop = gpio.promise
const isNumber = require('lodash.isnumber')

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
    return gpiop.write(this.pin, 0)
  }

  turnOn () {
    return gpiop.write(this.pin, 1)
  }

  initialize () {
    const self = this

    return gpiop
      .setup(self.pin, gpio.DIR_OUT)
      .then(() => {
        info('opened.', self.name)
        diehard.register(
          /* istanbul ignore next */
          (done) => {
            info('closing', self.name)
            gpiop
              .destroy(self.pin)
              .then(() => {
                info('closed', self.name)
                done()
              })
          })
      })
  }
}

module.exports = LED
