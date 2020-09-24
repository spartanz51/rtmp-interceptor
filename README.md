# rtmp-interceptor

A simple TCP server that intercepts RTMP packets in order to get the tcURL and API key, and proxify the packets to your remote server ([nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module) for example).
It allows you to easily authentify your RTMP stream with your API to accept or reject incoming stream.

## Installation:

    npm i rtmp-interceptor
    
## Usage

### 

    const RTMPInterceptor = require('rtmp-interceptor')

    const params = {
	    remoteHost: "51.25.22.322",
	    remotePort: '1935',
	    listenPort: '1936'
    }
    RTMPInterceptor.listen(params, (client, server, data) => {
	    console.log(data) /* Do something with the data ... */
    })

![example/interceptUrl.js](https://s1.gifyu.com/images/ezgif.com-gif-maker-247b9f721da2a0ccb.gif)

See examples

## Todo: 
 - [x] Intercept RTMP tcUrl
 - [x] Intercept RTMP API KEY
