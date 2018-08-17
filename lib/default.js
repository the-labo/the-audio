/**
 * Default exports
 * @module default
 */
'use strict'

const create = require('./create')
const helpers = require('./helpers')
const TheAudio = require('./TheAudio')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheAudio,
  create,
  helpers,
})
