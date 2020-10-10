const RTMPInterceptor = require('..')

const params = {
  listenPort: '1936'
}

RTMPInterceptor.listen(params, (client, tcUrl, SKey) => {
  const token = '32e86abbf8393b9c36'

  if(SKey === token) {
    console.log('Key verified: passthrought to server')
    return {
      host: 'localhost',
      port: '1935'
    }
  }else{
    console.log('Invalid key: ending socket')
    return false
  }
})
