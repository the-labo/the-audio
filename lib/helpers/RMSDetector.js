/**
 * @class RMSDetector
 */
'use strict'

const numcal = require('numcal')

/** @lends RMSDetector */
class RMSDetector {
  constructor (options = {}) {
    const {
      fireSize = 880,
      onToggle,
      threshold = 0.12,
    } = options
    this.queue = []
    this.fireSize = fireSize
    this.threshold = threshold
    this.active = false
    this.onToggle = onToggle
  }

  clear () {
    this.queue = []
  }

  handle (v) {
    const { fireSize, queue, threshold } = this
    queue.push(v)
    const shouldFire = queue.length % fireSize === 0
    if (!shouldFire) {
      return null
    }
    const value = numcal.ave(queue)
    this.queue = []
    const active = threshold < value
    if (this.active !== active) {
      this.active = active
      this.onToggle(active)
    }
    return {}
  }
}

module.exports = RMSDetector
