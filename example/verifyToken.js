const RTMPInterceptor = require('..')

const params = {
  remoteHost: "51.25.22.322",
  remotePort: '1935',
  listenHost: 'localhost',
  listenPort: '1936'
}

RTMPInterceptor.listen(params, (client, server, data) => {
  const token = 'JZ9vZhYMWPFrCtd4vpYdwpqtndRRBSvu'
  const url = 'rtmp://'+params.listenHost+':'+params.listenPort+'/'+token

  if(data === url) {
    console.log('Token verified: passthrought to server')
  }else{
    console.log('Invalid token: ending socket')
    client.end()
  }
})
