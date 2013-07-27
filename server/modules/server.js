/**
 * @author jerry
 */
var http = require('http'), 
queryString = require('querystring'), 
requestHandler = require('./requestHandlers');

var start = function(port) {
	
	port = port || 8080;
	function onRequest(req, res) {
		console.log('======', req.url, res.method);
		req.post = queryString.parse(req.url);

		requestHandler.init(req, res);
	}


	http.createServer(onRequest).listen(8080);
	console.log('======= Server has started');
}

exports.start = start;
