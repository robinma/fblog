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

var connect_mongo=function(){
	var i=0;
	return function(){
		if(i)return;
		i++;
		mongoose.connect(conHref);
		console.log('\033[42m Connection mongoDB success \033[0m');
	}
}();
module.exports=mongo;