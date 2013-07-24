/**
 * @author jerry
 */
var http=require('http');
var url=require('url');

var start=function(route,handle){
	function onRequest(request,response){
		
		console.log('======',request.url,response.method);
		var pathname=url.parse(request.url).pathname;
		route(handle,pathname,request,response);
	}
	http.createServer(onRequest).listen(8080);
	console.log('======= Server has started');
}

exports.start=start;