/**
 * @author jerry
 */
var utils = require('../utils');
/**
 * module 'Route'
 */

module.exports = Route;
/**
 * initialize 'Route' with the gievn HTTP 'method','path',
 * and an array of 'callbacks' and 'options'
 * options:
 * 	-'sensitive'	enable case-sensitive routes
 * 	-'strict'		enable strict matching for trailing slashes
 * @param {Object} method
 * @param {Object} path
 * @param {Object} callbacks
 * @param {Object} options
 */
function Route(method, path, callbacks, options) {
	options = options || {};
	this.path = path;
	this.method = method;
	this.callbacks = callbacks;
	this.regExp = utils.pathRegexp(path, this.key = [], options.sensitive, options.strict);
}

/**
 * Check if this route matches `path`, if so
 * populate `.params`.
 *
 * @param {String} path
 * @return {Boolean}
 * @api private
 */

Route.prototype.match = function(path) {
	var keys = this.keys, params = this.params = [], m = this.regexp.exec(path);

	if (!m)
		return false;

	for (var i = 1, len = m.length; i < len; ++i) {
		var key = keys[i - 1];

		//var val = 'string' == typeof m[i] ? utils.decode(m[i]) : m[i];
		var val = 'string' == typeof m[i] ? m[i] : m[i];
		if (key) {
			params[key.name] = val;
		} else {
			params.push(val);
		}
	}

	return true;
};
