/**
 * @author robin ma
 */

//controller 上下文
var controllerContext = function(req, res) {
	this.req = req;
	this.res = res;
	this.handler404 = handler404;
	this.handler500 = handler500;
}

var ccproto=controllerContext.prototype;

ccproto['render']=function(viewpath,cjson){
	console.log('render me');
};

var handler404 = function(req, res) {
	res.writeHead(404, {
		'Content-Type' : 'text/plain'
	});
	res.end('Page Not Found');
};

var handler500 = function(req, res, err) {
	res.writeHead(500, {
		'Content-Type' : 'text/plain'
	});
	res.end(err);
};
exports.controllerContext=controllerContext;