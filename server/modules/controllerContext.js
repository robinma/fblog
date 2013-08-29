/**
 * @author robin ma
 */
var path = require('path');
var config = require("../config/config");
var Cpage = require('./cpage');
var juicer = require('../node_modules/juicer/build/juicer-min');
var component = require('./component');
//var mongodb=require('./mongodb_connect');

var cpage = new Cpage;
//controller 上下文
var controllerContext = function(req, res) {
	Cpage.call(this, req, res);
	this.handler404 = handler404;
	this.handler500 = handler500;
}

controllerContext.prototype = cpage;

var ccproto = controllerContext.prototype;

/**
 * @TODU render page
 */
ccproto['render'] = function(tpl, cjson) {
	var head=this.getHeadInfo();
	var tail=this.getTail();
	var ntpl=head+tpl+tail;
	viewEngine.render(this.req, this.res, ntpl, cjson);
};
/**
 * @TODO get template
 */
ccproto['getTpl'] = function(viewname, callback) {
	var filename = getViewPath(viewname, 'view', '.html');
	this.getTemplate(filename, callback);
}
//get component object
ccproto['getComponent'] = function(compModel, callback) {
	var filePath = getViewPath(compModel, 'component');
	var compObj = require(filePath);

	var comp = new component(this.req, this.res);

	compObj.apply(comp, [callback]);
};


ccproto['getView'] = function(viewPattrn, callback) {
	var filePath = getViewPath(viewPattrn, 'view');
	var viewObj = require(filePath);
	viewObj.call(this);
	this.getTpl(viewPattrn,callback);
};

/**
 * TODO acrade the viewParrrn and type get pathnane
 * @param {Object} viewPattrn
 * @param {Object} type
 */
var getViewPath = function(viewPattrn, type, extname) {
	var ename = extname || '.js';
	var compPath = viewPattrn.split(/[_-]/).join('/'), filename;
	compPath = /.js/.test(path.extname(compPath)) ? compPath : compPath + ename;
	if (type == 'component') {
		filename = path.join(__dirname, config.fPath.componentDir, compPath);
	} else if (type == 'view') {
		filename = path.join(__dirname, config.fPath.tplFilesDir, compPath);
	}
	return filename;
}
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

var viewEngine = {
	render : function(req, res, tpl, context) {
		//get template string call back function
		var output = juicer(tpl, context);
		res.writeHead(200, {
			'Content-text' : 'text/html'
		});
		res.end(output);
	},
	renderJson : function(res, json) {
		//TODO
	}
}
exports.controllerContext = controllerContext;
