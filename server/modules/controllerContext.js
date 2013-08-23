/**
 * @author robin ma
 */
var path = require('path');
var config = require("../config/config");
var Cpage=require('./cpage');
var juicer=require('../node_modules/juicer/build/juicer-min.js');
var component=require('./component.js');
var cpage=new Cpage;
//controller 上下文
var controllerContext = function(req, res) {
	this.req = req;
	this.res = res;
	this.handler404 = handler404;
	this.handler500 = handler500;
}

controllerContext.prototype=cpage;

var ccproto=controllerContext.prototype;

/**
 * @TODU render page
 */
ccproto['render']=function(tpl,cjson){
	viewEngine.render(this.req,this.res,tpl,cjson);
};
/**
 * @TODO get template 
 */
ccproto['getTpl']=function(viewname,callback){
	var filename= path.join(__dirname, config.fPath.tplFilesDir, viewname);
	this.getTemplate(this.req,this.res,filename,callback);
}

//get component object
ccproto['getComponent']=function(compModel,callback){
	var compPath=compModel.split(/[_-]/).join('/');
	compPath=/.js/.test(path.extname(compPath))?compPath:compPath+'.js';
	var filename= path.join(__dirname, config.fPath.componentDir, compPath);
	var compObj=require(filename);
	
	var comp=new component(this.req,this.res);
	
	compObj['get_view'].apply(comp,[callback]);
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
	render:function(req,res,tpl,context){
		//get template string call back function
			var output=juicer(tpl,context);
			res.writeHead(200,{'Content-text':'text/html'});
			res.end(output);
	},
	renderJson:function(res,json){
		//TODO
	}
}
exports.controllerContext=controllerContext;