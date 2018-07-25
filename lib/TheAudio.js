/**
 * @class TheAudio
 */
'use strict'

const {get} = require('the-window')

/** @lends TheAudio */
class TheAudio {
  static async createAudioContext (modules) {
    const AudioContext = get('AudioContext')
    if (!AudioContext) {
      return null
    }
    const context = new AudioContext()
    for (const module of modules) {
      await context.audioWorklet.addModule(module)
    }
    return context
  }

  constructor (options = {}) {
    const {modules = []} = options
    this.modules = modules
    this.context = null
    this.closed = false
  }

  createProcessor (name, {onMessage} = {}) {
    const AudioWorkletNode = get('AudioWorkletNode')
    const processor = new AudioWorkletNode(this.context, name)
    processor.port.onmessage = ({data}) => {
      onMessage && onMessage(data)
    }
    return processor
  }

  /**
   * Close audio context
   * @returns {Promise<void>}
   */
  async close () {
    this.closed = true
    this.context.close()
  }

  /**
   * Open audio context
   * @returns {Promise<void>}
   */
  async open () {
    const context = await TheAudio.createAudioContext(this.modules)
    if (!context) {
      throw new Error(`[TheAudio] AudioContext failed`)
    }
    this.context = context
    this.closed = false
  }

}

module.exports = TheAudio
