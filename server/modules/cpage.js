/**
 * @author robin ma
 */
var fs = require('fs');

var cpage = function(req, res) {
	this.req = req;
	this.res = res;
};

var cproto = cpage.prototype;

cproto['getTemplate'] = function(pathname, callback) {
	var __ = this;
	fs.exists(pathname, function(exists) {
		if (!exists) {
			__.res.writeHead(404, {
				'Content-Type' : 'text/plain'
			});
			__.res.end('Page Not Found');
		} else {

			fs.readFile(pathname, 'utf8', function(err, data) {
				if (err) {
					__.res.writeHead(500, {
						'Content-Type' : 'text/plain'
					});
					__.res.end(err);
				}
				if ( typeof callback === 'function') {
					callback(data);
				};
			})
		}
	});
};
//get view template
cproto['getTplPath'] = function() {
};

cproto['render'] = function() {
};

cproto['setMeta'] = function() {
};
cproto['setCss'] = function() {
};
cproto['setJs'] = function() {
};


module.exports = cpage;
