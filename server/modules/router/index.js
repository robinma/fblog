/**
 * @author jerry
 */

function Router(options){
	options=iptions||{};
	var __=this;
	this.map={};
	this.params={};
	this._params=[]; //Register a param callback `fn` for the given `name`.
	this.caseSensitive=options.caseSensitive;
	this.strict=options.strict;
	
}

/**
 * Route dispatcher the route "middleware"
 * 
 * @param {InComMessage} req
 * @param {serverResponse} res
 * @param {Function} txt
 * @api private
 */
Router.prototype._dispatch=function(req,res,txt){
	
}
