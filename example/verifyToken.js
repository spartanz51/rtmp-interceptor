const RTMPInterceptor = require('..')

const params = {
  listenPort: '1936'
}

RTMPInterceptor.listen(params, (client, tcUrl, SKey) => {
  const token = '32e86abbf8393b9c36'
  const url = 'rtmp://localhost:'+params.listenPort+'/live/'+token

  if(tcUrl === url) {
    console.log('Token verified: passthrought to server')
    return {
      host: 'localhost',
      port: '1935'
    }
  }else{
    console.log('Invalid token: ending socket')
    return false
  }
})
