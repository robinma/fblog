/**
 * @author jerry
 */
var http = require('http'), 
queryString = require('querystring'), 
requestHandler = require('./requestHandlers');

var start = function(port) {
	
	port = port || 8080;
	function onRequest(req, res) {
		console.log('onRequest : ', req.url, res.method);
		req.post = queryString.parse(req.url);

		requestHandler.init(req, res);
	}

	http.createServer(onRequest).listen(port);
	console.log('\033[42m service start success \033[0m');
}

exports.start = start;
