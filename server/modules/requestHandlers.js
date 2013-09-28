/**
 * @author robin ma
 * 主要处理路由部分，根据请求参籹，确定是动态文件还是静态文件
 */
var url = require('url');
var path = require('path');
var fs = require('fs');
var route = require('./route');
var map = require('../../fmvc/application/config/map');

var config = require("../config/config");
var mime = require('../config/mime').types;

var cct=require('./controllerContext');

var requestHandlers = function(req, res) {

	//get rotu setting infomations
	var actionInfo = route.getActionInfo(req, req.method);
	
	if (actionInfo.action) {
		frog.log.bok('action:',actionInfo.action);
		var contrPath= actionInfo.controller.split(/[_-]/).join('/');
		var controller = require(config.fPath.controllers + contrPath);

		if (controller[actionInfo.action]) {
			var ct=new cct.controllerContext(req,res);
			controller[actionInfo.action].apply(ct,[actionInfo]);
		} else {
			res.writeHead(500, {
				'Content-Type' : 'text/plain'
			});
			res.write('the server is not fine ' + actionInfo.action);
			res.end(err);
		}
	} else {
		// if route not exec,than it is static Files;
		staticFileServer(req, res);
	}
};

//static server

var staticFileServer = function(request, response) {
	console.log('this is static Faie server area');
	var pathname = url.parse(request.url).pathname;
	var realPath = path.join(__dirname, config.fPath.staticFilesDir, pathname);
	console.log('realPath:   ', realPath);
	var ext = path.extname(realPath);
	ext = ext ? ext.slice(1) : 'text/plain';

	// check the file is exist
	fs.exists(realPath, function(exists) {

		if (!exists) {
			response.writeHead(404, {
				'Content-Type' : 'text/plain'
			});
			response.write('This request URL ' + pathname + ' was not found on this server.');
			response.end();
		} else {
			//check file statue
			fs.stat(realPath, function(err, stat) {

				var lastModified = stat.mtime.toUTCString();
				var ifModifiedSince = "If-Modified-Since".toLowerCase();
				//get client response header ptotype
				response.setHeader('Last-Modified', lastModified);
				console.log('Last-Modified', lastModified);
				//if the file is appointed type --gif|png|jpg|js|css
				if (ext.match(config.Expires.fileMatch)) {
					var expires = new Date();
					expires.setTime(expires.getTime() + config.Expires.maxAge * 1000);
					response.setHeader('Expires', expires.toUTCString());
					response.setHeader('Cache-Control', 'private,max-age=' + config.Expires.maxAge);
				}
				//compare the file last modified
				if (request.headers[ifModifiedSince] && lastModified == request.headers[ifModifiedSince]) {
					response.writeHead(304, "Not Modified.");
					response.end();
				} else {
					//read file
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

exports.init = requestHandlers;
