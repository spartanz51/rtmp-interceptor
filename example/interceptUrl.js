const RTMPInterceptor = require('..')

const params = {
  remoteHost: "51.25.22.322",
  remotePort: '1935',
  listenPort: '1936'
}

RTMPInterceptor.listen(params, (client, server, data) => {
  console.log(data) /* Do something with the data ... */
})
