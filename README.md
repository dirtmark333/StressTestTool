# StressTestTool
## First steps to do

To be able to run the script you will need to download and install NodeJS which can be found here: https://nodejs.org/en/

The script uses modules so these have to be downloaded and installed as well.
You may use the following commands in your terminal/cmd:

		npm install async
		npm install request
	
## Running the application

You will need to type the following command where the "url" is the Web Application's/API's address and the "rps" is the number of requests per second (this parameter is optional).
	
		node acr.js url [rps]
