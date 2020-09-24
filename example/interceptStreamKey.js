const RTMPInterceptor = require('..')

const params = {
  remoteHost: "51.25.22.322",
  remotePort: '1935',
  listenPort: '1935'
}

RTMPInterceptor.listen(params, (client, server, tcUrl, SKey) => {
  console.log('tcUrl: '+tcUrl)      /* Do something with the data ... */
  console.log('StreamKey: '+SKey)
})
