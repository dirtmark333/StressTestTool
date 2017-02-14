## Simple server provided

The stress test tool was tested againts this simple http web-server. To be able to run it you will need to download and install the http module what can be done by giving the following command:

		npm install http

To run the server you will need to type:

		node --max-old-space-size=10 simple-http.js

In this case the http://localhost:8080 should be set as the url parameter of the stress test tool.
With the --max-old-space-size=10 parameter we can limit the heap memory (to 10MB) used by the server. In this way we simulate a really poor server so we can easily reach the right amount of requests per second what the server cannot handle.