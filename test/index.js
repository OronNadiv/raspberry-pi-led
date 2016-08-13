const Chance = require('chance')
const mockery = require('mockery')
const Promise = require('bluebird')
const should = require('should')

const chance = new Chance()
let LED

describe('LED tests', () => {
  before(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    })

    const gpioMock = {
      open: (pin, direction, callback) => {
        pin.should.be.within(0, 30)
        direction.should.equal('output')
        should.ok(callback)
        callback()
      },
      write: (pin, value, callback) => {
        pin.should.be.within(0, 30)
        should.ok(value === 0 || value === 1)
        should.ok(callback)
        callback()
      }

    }
    mockery.registerMock('pi-gpio', gpioMock)
    LED = require('../src/index')
  })

  after(() => {
    mockery.disable()
  })

  it('LED initialize, valid pin, turn on, turn off', () => {
    const led = new LED(chance.name(), chance.integer({min: 0, max: 30}))
    return Promise
      .resolve(led.initialize())
      .then(() => led.turnOn())
      .then(() => led.turnOff())
  })

  it('LED initialize, invalid pin, turn on, turn off', () => {
    const led = new LED(chance.name(), chance.integer({max: -1}))
    return Promise
      .resolve(led.initialize())
      .then(() => led.turnOn())
      .then(() => led.turnOff())
  })
})
