const RTMPInterceptor = require('..')

const params = {
  remoteHost: "51.25.22.322",
  remotePort: '1935',
  listenPort: '1935'
}

RTMPInterceptor.listen(params, (client, server, tcUrl, SKey) => {
  const token = 'JZ9vZhYMWPFrCtd4vpYdwpqtndRRBSvu'

  if(SKey === token) {
    console.log('Key verified: passthrought to server')
  }else{
    console.log('Invalid key: ending socket')
    client.end()
  }
})
