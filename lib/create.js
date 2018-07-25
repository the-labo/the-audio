/**
 * Create a TheAudio instance
 * @function create
 * @param {...*} args
 * @returns {TheAudio}
 */
'use strict'

const TheAudio = require('./TheAudio')

/** @lends create */
function create (...args) {
  return new TheAudio(...args)
}

module.exports = create
