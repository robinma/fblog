/**
 * @author jerry
 */
module.exports = function() {
	var db = this.db;
	var mongoose = this.mongoose;

	var Schema = mongoose.Schema;

	var Article = new Schema({
		userid : Number,
		title : {type:String,max:30},
		content : {type:String},
		timestamp : {type:Date,default:Date.now()},
		images : {type:[String]},
		visiCount : {type:Number},
		commCount : {type:Number},
		classid : {type:Number}
	});
	
	//访问模型
	
	var blog=mongoose.model('blog',Article);
	
	//实例
	var dit={userid:1,title:'testname',content:'this is content'};
	var blogtest=new blog(dit);
	blogtest.save(function(err){
		console.log(err);
		if(err){
			console.log('------',err);
		}else{
			console.log('++++++',err);
		}
	});
	
	console.log('=====',blogtest);
	

}
