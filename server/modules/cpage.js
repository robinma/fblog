/**
 * @author robin ma
 */
var fs = require('fs');

exports.getTpl = function(req,res,pathname, callback) {
	fs.exists(pathname, function(exists) {
		
		if (!exists) {
			res.writeHead(404, {
				'Content-Type' : 'text/plain'
			});
			res.end('Page Not Found');
		} else {
			
			fs.readFile(pathname,'utf8', function(err, data) {
				if (err) {
					res.writeHead(500, {
						'Content-Type' : 'text/plain'
					});
					res.end(err);
				}
				if(typeof callback === 'function'){
					
					callback(data);
				};
			})
		}
	});
}
