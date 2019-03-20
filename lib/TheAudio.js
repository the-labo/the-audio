/**
 * @class TheAudio
 */
'use strict'

const { get } = require('the-window')

/** @lends TheAudio */
class TheAudio {
  static async createAudioContext(modules, options = {}) {
    const AudioContext = get('AudioContext')
    if (!AudioContext) {
      return null
    }
    const { sampleRate } = options
    const context = new AudioContext({
      sampleRate,
    })
    for (const module of modules || []) {
      await context.audioWorklet.addModule(module)
    }
    return context
  }

  constructor(options = {}) {
    const { modules = [], sampleRate } = options
    this.modules = modules
    this.sampleRate = sampleRate
    this.context = null
    this.active = false
  }

  createProcessor(name, { onMessage } = {}) {
    this._assertOpen()
    const AudioWorkletNode = get('AudioWorkletNode')
    const processor = new AudioWorkletNode(this.context, name)
    processor.port.onmessage = ({ data }) => {
      onMessage && onMessage(data)
    }
    return processor
  }

  /**
   * Close audio context
   * @returns {Promise<void>}
   */
  async close() {
    if (!this.active) {
      throw new Error(`[TheAudio] Already closed`)
    }
    this.active = false
    this.context.close()
    this.context = null
  }

  /**
   * Open audio context
   * @returns {Promise<void>}
   */
  async open() {
    if (this.active) {
      throw new Error(`[TheAudio] Already open`)
    }
    this.active = true
    const { sampleRate } = this
    const context = await TheAudio.createAudioContext(this.modules, {
      sampleRate,
    })
    if (!context) {
      throw new Error(`[TheAudio] AudioContext failed`)
    }
    this.context = context
  }

  _assertOpen() {
    if (!this.active) {
      throw new Error(`[TheAudio] Needs open`)
    }
  }
}

module.exports = TheAudio
