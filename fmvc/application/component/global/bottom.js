/**
 * @author jerry
 */

module.exports =function(callback){
	this.getTpl(__filename,function(data){
		callback(data)
	});
};