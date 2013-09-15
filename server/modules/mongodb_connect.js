/**
 * @author robin ma
 */
var mongoose = require('mongoose');
var conf={
	'host':'mongodb://127.0.0.1',
	dbname:'blog',
	port:27017
	
}
var conHref=conf.host+(conf.port?':'+conf.port+"/":"/")+conf.dbname;

var mongo=function(){
	this.db=null;
	this.mongoose=null;
}

var monProto=mongo.prototype;

monProto['init']=function(){
	connect_mongo();
	//mongoose.connect(conHref);
	var db = mongoose.connection;
	db.on('err', console.error.bind(console, 'connection error:'));
	this.mongoose=mongoose;
	this.db=db;
};

monProto['getOrCreateModel']=function(name,schema){
	var mong=this.mongoose,mod;
	try{
		mod=mong.model(name,schema);
	}catch(err){
		mod=mong.model(name);
	}
	return mod;
};

monProto['getId']=function(){
	var ctime=+new Date,mr=(Math.random()*1000000)|0;
	return (ctime+mr).toString(16);
	
}
var connect_mongo=function(){
	var i=0;
	return function(){
		if(i)return;
		i++;
		mongoose.connect(conHref);
		frog.log.bok('Connection mongoDB success');
	}
}();
module.exports=mongo;