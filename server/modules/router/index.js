/**
 * @author jerry
 */
var methods = require('methods'), 
Route=require('./route'),
utils = require('../utils');

function Router(options) {
	options = options || {};
	var __ = this;
	this.map = {};
	this.params = {};
	this._params = [];
	//Register a param callback `fn` for the given `name`.
	this.caseSensitive = options.caseSensitive;
	this.strict = options.strict;

}

/**
 * Route dispatcher the route "middleware"
 *
 * @param {InComMessage} req
 * @param {serverResponse} res
 * @param {Function} txt
 * @api private
 */
Router.prototype._dispatch = function(req, res, txt) {

}

/**
 * Route 'method','paht',and one or more callbacks
 * @param {Object} method
 * @param {Object} path
 * @param {Object} callbacks
 */
Router.prototype.route = function(method, path, callbacks) {
	var mathod = method.toLowerCase(), callbacks = utils.flatten([].slice.call(arguments, 2));

	//ensure path was given
	if (!path)
		throw new Error('Route#' + method + '() requires a path');

	//ensure all callbacks are functions
	callbacks.forEach(function(fn, i) {
		if ('function' == typeof fn)
			return;
		var type = {}.toString.call(fn);
		var msg = '.' + method + '() requires callback functions but got a ' + type;
		throw new Error(msg);
	});

	// create the route
	var route = new Route(method, path, callbacks, {
		sensitive : this.caseSensitive,
		strict : this.strict
	});

	//add it
	(this.map[method] = this.map[method] || []).push(route);
	return this;
}

methods.forEach(function(method) {
	Router.prototype[method] = function(path) {
		var args = [method].concat([].slice.call(arguments));
		this.route.apply(this, args);
		return this;
	}
});

module.exports = Router;
