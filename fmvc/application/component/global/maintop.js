/**
 * @author jerry
 */
var path=require('path');

exports.get_view=function(callback){
	var pathStr=__filename.replace(path.extname(__filename),'.html');
	
	this.getTpl(pathStr,function(data){
		callback(data)
	});
};

