/**
 * @author robin ma
 */

var mongodb=require('mongodb');

var server = new mongodb.Server('127.0.0.1',27017,{auto_reconnect:true});
var db=new mongodb.Db('blog',server,{safe:true});

db.open(function(err,db){
	if(!err){
		console.log('========connect db success=======');
	}else{
		console.log('--------connect db fail-------------------')
	}
})
