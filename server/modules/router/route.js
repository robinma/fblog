/**
 * @author jerry
 */
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
function Route(method,path,callbacks,options){
	options=options||{};
	this.path=path;
	this.method=method;
	this.callbacks=callbacks;
	this.regExp=path;
}

/**
 * 
 */

Route.prototype.match=function(path){
	return path;
}
