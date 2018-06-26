import request from 'request-promise'

export default class RestHttp {
  constructor (options) {
    this.server = process.env.HTTP_ADDRESS || 'http://localhost:8088'
    if (!this.server) {
      throw new Error('HTTP_ADDRESS Env variable is not defined')
    }
  }

  start () {
    return Promise.resolve()
  }

  stop () {
    return Promise.resolve()
  }

  encrypt (text) {
    return request({
      method: 'POST',
      uri: `${this.server}/encrypt`,
      headers: {
        'content-type': 'text/plain'
      },
      body: text
    })
  }

  decrypt (cipher) {
    return request({
      method: 'POST',
      uri: `${this.server}/decrypt`,
      headers: {
        'content-type': 'text/plain'
      },
      body: cipher
    })
  }
}
