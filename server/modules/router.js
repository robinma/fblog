/**
 * @author robin ma
 */
var fs=require('fs');
var path=require('path');

function route(handle,pathname){
	console.log("About to route a request for "+pathname);
	if(typeof handle[pathname] === 'function'){
		handle[pathname]();
	}else{
		console.log('==========no request handle found for '+pathname);
		staticFiles(pathname);
	}
}


var staticFiles=function(pathname){
	var realPath='web'+pathname;
	fs.exists(realPath,function(exists){
		if(!exists){
			response.writeHead(404,{'Content-Type':'text/plain'});
			response.write('This request URL '+realPath+' was not found on this server.');
			response.end();
		}else{
			fs.readFile(realPath,function(err,data){
				if(err){
					response.writeHead(500,{'Content-Type':'text/plain'});
					response.end(err);
				}else{
					response.writeHead(200,{'Content-Type':'text/plain'});
					response.write(file,'binary');
					response.end();
				}
			})
		}
	});
}


exports.route=route;
