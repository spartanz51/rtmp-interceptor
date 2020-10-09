const RTMPInterceptor = require('..')

const params = {
  remoteHost: "localhost",
  remotePort: '1935',
  listenPort: '1936'
}

RTMPInterceptor.listen(params, (client, server, tcUrl, SKey) => {
  console.log('tcUrl: '+tcUrl)      /* Do something with the data ... */
  console.log('StreamKey: '+SKey)
})
