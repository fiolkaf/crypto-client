import uuid from 'uuid'
import amqp from 'amqplib'

export default class JsonRmq {
  constructor () {
    this.server = process.env.RMQ_ADDRESS || 'localhost'
    if (!this.server) {
      throw new Error('RMQ_ADDRESS Env variable is not defined')
    }

    this.requests = {}
  }

  async start () {
    this.connection = await amqp.connect(`amqp://${this.server}`)
    this.channel = await this.connection.createChannel()
    this.channel.assertQueue('crypto_out', { durable: false })
    this.channel.assertQueue('crypto_in', { durable: false })
    this.channel.consume('crypto_out', this._handler.bind(this))
  }

  async stop () {
    return this.connection && this.connection.close()
  }

  encrypt (text) {
    return this._request('encrypt', text)
  }

  decrypt (cipher) {
    return this._request('decrypt', cipher)
  }

  async _handler (message) {
    const content = Buffer.from(message.content).toString()
    const payload = JSON.parse(content)
    const promise = this.requests[payload.correlationId]

    if (!promise) { // timeout or different client
      return
    }

    await this.channel.ack(message)

    promise.resolve(payload.data)
  }

  async _request (type, text) {
    const id = uuid.v4()
    const payload = JSON.stringify({
      id,
      type,
      data: text
    })
    this.channel.sendToQueue('crypto_in', Buffer.from(payload))

    return new Promise((resolve, reject) => {
      this.requests[id] = { resolve, reject }
      setTimeout(() => {
        this.requests[id] = null
        reject(new Error('E_TIMEOUT'))
      }, 1000)
    })
  }
}
