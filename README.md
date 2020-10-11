# rtmp-interceptor

A simple TCP server that intercepts RTMP packets in order to get the tcURL and API key, and proxify (or reject) the packets to your remote server ([nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module) for example).
It allows you to easily authentify your RTMP stream with your API to accept or reject incoming stream.

## Installation:

    npm i rtmp-interceptor
    
## Usage

### Intercept tcUrl and streamKey

Intercept tcurl, streamkey, then forward the data to the specified rtmp server (localhost:1935).

```
const RTMPInterceptor = require('rtmp-interceptor')

const params = {
  listenPort: '1936'
}

RTMPInterceptor.listen(params, (client, tcUrl, SKey) => {
  console.log('tcUrl: '+tcUrl)      /* Do something with the data ... */
  console.log('StreamKey: '+SKey)

  return {                          /* Return false to block client and close stream */
    host: 'localhost',
    port: '1935'
  }
})

```

Open OBS, and start streaming on 'rtmp://localhost:1936/live'

Output:

> tcUrl: rtmp://localhost:1936/live
> StreamKey: specified stream key


### Authentify client

You can choose to proxify or reject the client, based on the streamkey or tcurl for example.
See [this example](https://github.com/spartanz51/rtmp-interceptor/blob/master/example/verifyStreamKey.js)


### Hook streamKey

Hooking the rtmp streamkey could be used when a client hasn't the stream key input (GoPRO for example)
It allows you to pass the stream key in the tcurl for example, and hook it into the RTMP packet.

```
const RTMPInterceptor = require('rtmp-interceptor')

const params = {
  listenPort: '1936'
}

RTMPInterceptor.listen(params, async (client, tcUrl, SKey) => {
  console.log('tcUrl: '+tcUrl)      /* Do something with the data ... */
  console.log('StreamKey: '+SKey)

  return {                          /* Return false to block client and close stream */
    host: 'localhost',
    port: '1935',
    skChunks: ['\u0004\u0000\u0000\u0000\u0000\u0000)\u0014\u0001\u0000\u0000\u0000\u0002\u0000\u0007publish\u0000@\u0014\u0000\u0000\u0000\u0000\u0000\u0000\u0005\u0002\u0000\u000bMyHookedKey\u0002\u0000\u0004live']
  }
})



```

Server will see stream key as: *MyHookedKey*

**Note:** This method does not build the chunk: you have to build it yourself and pass the full chunk.

### Result with OBS


![example/interceptUrl.js](https://camo.githubusercontent.com/e2b3066ae5ffdf4b88a0542d73c210343f5f7da6/68747470733a2f2f73312e67696679752e636f6d2f696d616765732f657a6769662e636f6d2d6769662d6d616b65722d32343762396637323164613261306363622e676966)

See examples

## Features: 
 - [x] Intercept RTMP tcUrl
 - [x] Intercept RTMP API KEY
 - [x] Hook stream key
 - [ ] ~~Build stream key chunk~~ (PR is welcomed)
