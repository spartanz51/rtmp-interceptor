const RTMPInterceptor = require('..')

const params = {
  remoteHost: "51.25.22.322",
  remotePort: '1935',
  listenPort: '1935'
}

RTMPInterceptor.listen(params, (client, server, tcUrl) => {
  console.log(tcUrl) /* Do something with the data ... */
})
