/**
 * @author jerry
 */
var http = require('http'), 
queryString = require('querystring'), 
requestHandler = require('./requestHandlers');
var frog=require('./frog_log');
global.frog=frog;
var start = function(port) {
	
	port = port || 8080;
	function onRequest(req, res) {
		req.post = queryString.parse(req.url);

		requestHandler.init(req, res);
	}

	http.createServer(onRequest).listen(port);
	
	frog.log.ok('service start success');
}

exports.start = start;
