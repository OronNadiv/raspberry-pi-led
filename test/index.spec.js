/* eslint-disable no-unused-expressions */

const Chance = require('chance')
const mockery = require('mockery')
const Promise = require('bluebird')
const Chai = require('chai')

const expect = Chai.expect
const chance = new Chance()

describe('LED tests', () => {
  'use strict' // support for NodeJS v4
  let LED

  before(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    })

    const gpioMock = {
      DIR_OUT: 'out',
      promise: {
        setup: (pin, direction) => {
          expect(pin).to.be.within(0, 30)
          expect(direction).to.be.equal(gpioMock.DIR_OUT)
          return Promise.resolve()
        },
        write: (pin, value) => {
          expect(pin).to.be.within(0, 30)
          expect(value).to.be.oneOf([0, 1])
          return Promise.resolve()
        }
      }
    }
    mockery.registerMock('rpi-gpio', gpioMock)
    LED = require('../dist/index')
  })

  after(() => {
    mockery.disable()
  })

  it('LED initialize, valid pin, valid name, turn on, turn off', () => {
    const led = new LED({name: chance.name(), pin: chance.integer({min: 0, max: 30})})
    return Promise
      .resolve(led.initialize())
      .then(() => led.turnOn())
      .then(() => led.turnOff())
  })

  it('LED initialize, valid pin, missing name, turn on, turn off', () => {
    const led = new LED({pin: chance.integer({min: 0, max: 30})})
    return Promise
      .resolve(led.initialize())
      .then(() => led.turnOn())
      .then(() => led.turnOff())
  })

  it('LED initialize, invalid pin, turn on, turn off', () => {
    expect(() => new LED(chance.integer({max: -1}))).to.throw()
  })
})
