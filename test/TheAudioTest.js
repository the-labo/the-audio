/**
 * Test for TheAudio.
 * Runs with mocha.
 */
'use strict'

const TheAudio = require('../lib/TheAudio')
const {ok, equal} = require('assert')

describe('the-audio', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(TheAudio)
    ok(new TheAudio({}))
  })
})

/* global describe, before, after, it */
