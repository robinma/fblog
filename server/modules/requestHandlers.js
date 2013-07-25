/**
 * @author robin ma
 */
var route = require('./route');
var config = require("../config/config");
var mime = require('../config/mime').types;

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
			res.write('the server is not fine' + actionInfo.action);
			res.end(err);
		}
	} else {
		// if route not exec,than it is static Files;
		staticFileServer(pathname,req,res);
	}
}
//static server

var staticFileServer = function(pathname, request, response) {
	console.log('======', 'this is static Faie server area');
	var realPath = 'web' + pathname;
	var ext = path.extname(realPath);
	ext = ext ? ext.slice(1) : 'text/plain';
	fs.exists(realPath, function(exists) {
		console.log('at realPath:', realPath);
		if (!exists) {
			response.writeHead(404, {
				'Content-Type' : 'text/plain'
			});
			response.write('This request URL ' + realPath + ' was not found on this server.');
			response.end();
		} else {
			fs.stat(realPath, function(err, stat) {
				var lastModified = stat.mtime.toUTCString();
				var ifModifiedSince = "If-Modified-Since".toLowerCase();
				response.setHeader('Last-Modified', lastModified);
				console.log('Last-Modified', lastModified);
				if (ext.match(config.Expires.fileMatch)) {
					var expires = new Date();
					expires.setTime(expires.getTime() + config.Expires.maxAge * 1000);
					response.setHeader('Expires', expires.toUTCString());
					response.setHeader('Cache-Control', 'private,max-age=' + config.Expires.maxAge);
				}
				if (request.headers[ifModifiedSince] && lastModified == request.headers[ifModifiedSince]) {
					response.writeHead(304, "Not Modified.");
					response.end();
				} else {
					fs.readFile(realPath, 'binary', function(err, data) {
						if (err) {
							response.writeHead(500, {
								'Content-Type' : mime[ext]
							});
							response.end(err);
						} else {
							response.writeHead(200, {
								'Content-Type' : mime[ext]
							});
							response.write(data, 'binary');
							response.end();
						}
					})
				}

			});

		}
	});
}
