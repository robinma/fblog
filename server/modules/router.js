/**
 * @author robin ma
 */
var fs=require('fs');
var path=require('path');

var mime=require('../config/mime').types;
var config=require('../config/config');

function route(handle,pathname,response){
	console.log("About to route a request for "+pathname);
	if(typeof handle[pathname] === 'function'){
		handle[pathname]();
	}else{
		staticFiles(pathname,response);
	}
}


var staticFiles=function(pathname,response){
	var realPath='web'+pathname;
	var ext=path.extname(realPath);
	ext=ext?ext.slice(1) : 'unknow';
	fs.exists(realPath,function(exists){
		if(!exists){
			response.writeHead(404,{'Content-Type':mime[ext]});
			response.write('This request URL '+realPath+' was not found on this server.');
			response.end();
		}else{
			fs.readFile(realPath,function(err,data){
				if(err){
					response.writeHead(500,{'Content-Type':mime[ext]});
					response.end(err);
				}else{
					if(ext.match(config.Expires.fileMatch)){
						var expires=new Date();
						expires.setTime(expires.getTime()+config.Expires.maxAge*1000);
						response.setHeader('Expres',expires.toUTCString());
						response.setHeader('Cache-Control','max-age='+config.Expires.maxAge);
					}
					response.writeHead(200,{'Content-Type':mime[ext]});
					
					response.write(data,'binary');
					response.end();
				}
			})
		}
	});
}


exports.route=route;
