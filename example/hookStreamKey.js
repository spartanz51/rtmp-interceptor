const RTMPInterceptor = require('..')

function hookStreamKey (chunks) {
  return '\u0004\u0000\u0000\u0000\u0000\u0000)\u0014\u0001\u0000\u0000\u0000\u0002\u0000\u0007publish\u0000@\u0014\u0000\u0000\u0000\u0000\u0000\u0000\u0005\u0002\u0000\u000bMyHookedKey\u0002\u0000\u0004live'
}

const params = {
  remoteHost: "51.25.22.322",
  remotePort: '1935',
  listenPort: '1935',
  hookCb: hookStreamKey
}

RTMPInterceptor.listen(params, (client, server, tcUrl, SKey) => {
  console.log('tcUrl: '+tcUrl)      /* Do something with the data ... */
  console.log('StramKey: '+SKey)
})
