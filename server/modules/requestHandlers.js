/**
 * @author robin ma
 */
var route = require('./route');
var config = require("../config/config");

var requestHandlers = function(req, res) {

	var actionInfo = route.getActionInfo(req.url, req.method);

	if (actionInfo.action) {
		var controller = require(config.fPath.controllers + actionInfo.controller);
		//./controler/blog

		if (controller[actionInfo.action]) {
			console.log('=====', actionInfo.action);
		} else {
			res.writeHead(500, {
				'Content-Type' : 'text/plain'
			});
			res.write('the server is not fine'+actionInfo.action);
			res.end(err);
		}
	} else {
		// if route not exec,than it is static Files;
		
	}
}

