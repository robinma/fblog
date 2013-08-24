/**
 * @author jerry
 */
var path=require('path');
var cpage=require('./cpage');

function component(req,res){
	cpage.call(this,req,res);
};
component.prototype=new cpage;

var comPtoto=component.prototype;

//component entity
comPtoto['getTpl']=function(tplPath,callback){
	var pathStr=tplPath.replace(path.extname(tplPath),'.html');
	this.getTemplate(pathStr,callback);
};

module.exports = component;
