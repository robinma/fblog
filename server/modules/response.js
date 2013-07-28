/**
 * @author robin ma
 */
/*
 * write to client browser data
 */

var html=function(req,res){
	
	return function(statue,content){
		res.writeHeader(statue,{
			'Content-Type':'text/plain',
			'charset':'utf-8',
			'server':'nodejs'
		});
		res.end(content);
	}
	
}

exports.init=function(req,res){
	return{
		html:html(req,res)
	}
}
