/**
 * @author robin ma
 */
var fs = require('fs');
var path = require('path');

var mime = require('../config/mime').types;
var config = require('../config/config');

function route(handle, pathname, request, response) {
	console.log("About to route a request for " + pathname);
	if ( typeof handle[pathname] === 'function') {
		handle[pathname]();
	} else {
		staticFiles(pathname, request, response);
	}
}

var staticFiles = function(pathname, request, response) {
	
}

exports.route = route;
