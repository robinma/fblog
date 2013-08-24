/**
 * @author jerry
 */
var path=require('path');

module.exports =function(callback){
	this.getTpl(__filename,function(data){
		callback(data)
	});
};

