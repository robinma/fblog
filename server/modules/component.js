/**
 * @author jerry
 */

var cpage=require('./cpage');

function component(req,res){
	this.req = req;
	this.res = res;
};
component.prototype=new cpage;

var comPtoto=component.prototype;

//component entity
comPtoto['getTpl']=function(tplPath,callback){
	
	this.getTemplate(this.req,this.res,tplPath,callback);
};

module.exports = component;
