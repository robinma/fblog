/**
 * @author robin ma
 */
var path = require('path');
var config = require("../config/config");
var cpage=require('./cpage');
var juicer=require('../node_modules/juicer/build/juicer-min.js');

//controller 上下文
var controllerContext = function(req, res) {
	this.req = req;
	this.res = res;
	this.handler404 = handler404;
	this.handler500 = handler500;
}

var ccproto=controllerContext.prototype;

ccproto['render']=function(viewpath,cjson){
	viewEngine.render(this.req,this.res,viewpath,cjson);
};

ccproto['switch_page']=function(page,path){
	
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

var viewEngine={
	render:function(req,res,viewName,context){
		var filename= path.join(__dirname, config.fPath.tplFilesDir, viewName);

console.log('tpl files road',filename);
		
		cpage.getTpl(req,res,filename,getTplCB);
		
		//get template string call back function
		function getTplCB(tpl){
			var output=juicer(tpl,context);
			res.writeHead(200,{'Content-text':'text/html'});
			res.end(output);
		}
	},
	renderJson:function(res,json){
		//TODO
	}
}
exports.controllerContext=controllerContext;