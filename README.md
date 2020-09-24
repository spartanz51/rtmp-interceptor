# rtmp-interceptor

A simple TCP server that intercepts RTMP packets in order to get the tcURL and API key, and proxify the packets to your remote server ([nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module) for example).
It allows you to easily authentify your RTMP stream with your API to accept or reject incoming stream.

## Installation:

    npm i rtmp-interceptor
    
## Usage

### Intercept tcUrl and streamKey

    const RTMPInterceptor = require('rtmp-interceptor')

    const params = {
	    remoteHost: "51.25.22.122",
	    remotePort: '1935',
	    listenPort: '1935'
    }
    RTMPInterceptor.listen(params, (client, server, tcUrl, SKey) => {
      console.log('tcUrl: '+tcUrl)      /* Do something with the data ... */
      console.log('StreamKey: '+SKey)
    })

### Hook streamKey

Hooking the rtmp streamkey could be used when a client doesn't have the stream key input (GoPRO for example)
It allows you to pass the stream key in the tcurl for example, and hook it into the RTMP packet.

```
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

```

Server will see stream key as: *MyHookedKey*

**Note:** This method does not build the chunk: you have to build it yourself and pass the full chunk.

### Result with OBS


![example/interceptUrl.js](https://s1.gifyu.com/images/ezgif.com-gif-maker-247b9f721da2a0ccb.gif)

See examples

## Features: 
 - [x] Intercept RTMP tcUrl
 - [x] Intercept RTMP API KEY
 - [x] Hook stream key
 - [ ] ~~Build stream key chunk~~ (PR is welcomed)
