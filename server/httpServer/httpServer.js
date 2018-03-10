// author: Nikola Jovanovic

var express = require('express');
var app = express();

// list of expected get request URLs and response files
var requests = require('./definedRequests.js');

httpListener = function(path){
	// define callbacks for http get request responses
	for (var i in requests){
		app.get(requests[i].URL, function(ind){
			return function(req, res){
				res.sendFile(path + requests[ind].file);
			};
		}(i));
	}
	
	// set static path for client resource files
	app.use(express.static(path + '/client'));

	// listen on a port
	app.listen(8000);

	console.log('HTTP get request listener set up.');
}

module.exports = httpListener;
