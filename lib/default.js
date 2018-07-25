/**
 * Default exports
 * @module default
 */
'use strict'

const create = require('./create')
const TheAudio = require('./TheAudio')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheAudio,
})
