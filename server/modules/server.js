/**
 * @author jerry
 */
var http=require('http');
var url=require('url');

var start=function(route,handle){
	function onRequest(request,response){
		var pathname=url.parse(request.url).pathname;
		route(handle,pathname);
	}
	http.createServer(onRequest).listen(8080);
	console.log('Server has started');
}

exports.start=start;