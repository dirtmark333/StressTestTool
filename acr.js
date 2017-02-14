var async = require("async");
var request = require("request");

var url = process.argv[2];
var rps = process.argv[3];

var passedReq = 0, failedReq = 0;

if(url == null) {
	console.log('Please provide URL!');
	return;
}

if(rps == null) {
	startStressTest();
} else {
	sendRequestsWithPredefinedRps();
}

function startStressTest() {
	var rps = 1
	console.log('STRESS TEST STARTED!');
	async.whilst(function() {
		var arr = [];
		for (var i = 0; i < rps; i++) {
			arr.push(url);
		}
		// iterator function
		async.map(arr, function(){
			request(url, function (error, response) {
				if (!error && response.statusCode == 200) {
					passedReq++;
				} else {
					failedReq++;
				}
			});
		});
		return true;
		},
		function(callback) {
			setTimeout(function() {			
				if(failedReq>0){
					console.log('Test Failed with ' + rps + ' req/sec, ' + passedReq + ' passed and ' + failedReq + ' failed.')
					return;
				}
				console.log('Test Passed with ' + rps + ' req/sec.')
				passedReq = 0;
				failedReq = 0;
				rps = rps + 50;
				callback(null);
			}, 1000);
		},
		function(err) {
			console.log("we encountered an error", err);
		}
	);
}

function sendRequestsWithPredefinedRps() {
	var arr = [];
	for (var i = 0; i < rps; i++) {
		arr.push(url);
	}

	async.map(arr, function(url, callback) {
		// iterator function
		request(url, function (error, response) {
			if (!error && response.statusCode == 200) {
				passedReq++;
				callback(null);
			} else {
				failedReq++;
				callback(error);
			}
		});
	}, function(err) {
		// completion function
		if (!err) {
			console.log('TEST PASSED!');
			console.log('All the requests arrived. The number of requests was: ' + passedReq);
		} else {
			console.log('TEST FAILED!');
			console.log(passedReq + ' of ' + rps + ' requests passed!');
		}
	});
}