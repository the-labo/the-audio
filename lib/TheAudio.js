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
    const context = TheAudio.createAudioContext(modules)
    if (!context) {
      throw new Error(`[TheAudio] AudioContext failed`)
    }
    this.context = context
  }

  close () {
    this.context.close()
  }

  createProcessor (name, {onMessage} = {}) {
    const AudioWorkletNode = get('AudioWorkletNode')
    const processor = new AudioWorkletNode(this.context, name)
    processor.port.onmessage = ({data}) => {
      onMessage && onMessage(data)
    }
    return processor
  }

}

module.exports = TheAudio
