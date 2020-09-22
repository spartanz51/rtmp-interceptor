/*
 *   RTMP Interceptor - @Taigah @Spartanz51
 *   RTMP Spec source:
 *      https://wwwimages2.adobe.com/content/dam/acom/en/devnet/rtmp/pdf/rtmp_specification_1.0.pdf
 */

const net = require('net')
const stream = require('stream')
const { once } = require('events')

class RTMPInterceptor {
  constructor (remoteHost, remotePort, listenPort) {
    this.remoteHost = remoteHost
    this.remotePort = remotePort
    this.listenPort = listenPort

    this.startService()
  }

  startService() {
    this.server = net.createServer(client => { this.onstream(client) })
    this.server.listen(this.listenPort)
  }

  async onstream(client) {
    client.on('close', ()=>{
      this.onleave(client, passThrough)
    })
    const server = net.createConnection(this.remotePort, this.remoteHost)
    server.pipe(client)

    await this.handshake(client, server)          /* RTMP handshake */
  
    const passThrough = new stream.PassThrough()
    client.pipe(passThrough).pipe(server)

    passThrough.pause()
    const tcUrl = await this.getTCUrl(client)
    this.ondata(client, server, tcUrl)
    passThrough.resume()
  }

  async handshake (client, server) {              /* WARN: Doesn't verify handshake integrity */
    await once(client, 'readable')
    const c0 = client.read(1)
  
    await once(client, 'readable')
    const c1 = client.read(1536)
  
    server.write(c0)
    server.write(c1)
  
    await once(client, 'readable')
    const c2 = client.read(1536)
  
    server.write(c2)
  }

  async getTCUrl (client) {
    let tcURL
    while (true) {
      const chunk = await once(client, 'data')
      const matches = chunk.toString().match(/rtmp[^\0]+/)
      if (matches) {
        tcURL = matches[0]
        return tcURL
      }
    }
  }

  async onleave(passThrough) {
    passThrough.end()
  }

  async ondata() {}
}

function listen(payload, cb) {
  const r = new RTMPInterceptor(payload.remoteHost, payload.remotePort, payload.listenPort)
  r.ondata = cb
}

module.exports = { listen }
