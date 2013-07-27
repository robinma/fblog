/**
 * @author robin ma
 */
var fs = require('fs');
var path = require('path');

// var config = require('../config/config');
//
// function route(handle, pathname, request, response) {
// console.log("About to route a request for " + pathname);
// if ( typeof handle[pathname] === 'function') {
// handle[pathname]();
// } else {
// staticFiles(pathname, request, response);
// }
// }

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
		route[method].push({
			u : dict.url,
			c : dict.controller,
			a : dict.action || 'init'
		});
	}
}

exports.getActionInfo = function(url, method) {
	var r = {
		controller : null,
		action : null,
		args : null
	}, method = method ? method.toLowerCase() : 'get',

	//url
	pathName = parseUrl(url).pathname;

	var m_routes = routes[method];

	for (var i in m_routes) {
		//正则匹配
		r.args = m_routes[i].u.exec(pathName);
		console.log('-----routes ',m_routes[i],pathName);
		if (r.args) {
			r.controlls=m_routes[i].c;
			r.action=m_routes[i].a;
			break;
		}
	}
	//data format {controller:'blog',action:'get',args:['1']}
	return r;
}
