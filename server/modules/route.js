/**
 * @author robin ma
 * route 配置解析
 */
var fs = require('fs');
var path = require('path');
var parseUrl = require('url').parse;

//根据http请求的method方法来分别保存存route方法
var routes = {
	get : [],
	post : [],
	head : [],
	put : [],
	"delete" : []
};

//register route rolue
/*
 * route.map={
 * 	method:'get',
 * url:'',
 * controller:'search',
 * action:'init'
 * }
 */

exports.map = function(dict) {
	if (dict && dict.url && dict.controller) {
		var method = dict.method ? dict.method.toLowerCase() : 'get';
		routes[method].push({
			u : dict.url,
			c : dict.controller,
			t : dict.tpl||'',
			a : dict.action || 'init'
		});
	}
}

exports.getActionInfo = function(req, method) {
	var url=req.url;
	var r = {
		controller : null,
		action : null,
		args : null
	}, method = method ? method.toLowerCase() : 'get',

	//url
	pathName = parseUrl(url).pathname;
	
	
	
	// var m_routes = routes[method];
	// for (var i in m_routes) {
		// //正则匹配
		// r.args = m_routes[i].u.exec(pathName);
		// if (r.args) {
			// r.controller = m_routes[i].c;
			// r.action = m_routes[i].a;
			// r.args.shift();
			// r.tpl = m_routes[i].t;
			// break;
		// }
	// }
	//data format {controller:'blog',action:'get',args:['1']}
	
	
	
	return r;
}
