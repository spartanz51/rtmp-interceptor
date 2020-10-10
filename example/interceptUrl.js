const RTMPInterceptor = require('..')

const params = {
  listenPort: '1936'
}

RTMPInterceptor.listen(params, (client, tcUrl) => {
  console.log('tcUrl: '+tcUrl)      /* Do something with the data ... */

  return {                          /* Return false to block client and close stream */
    host: 'localhost',
    port: '1935'
  }
})
