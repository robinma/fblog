/**
 * @author jerry
 */
module.exports = function(callback) {
var __=this;
var db = this.db;
var mongoose = this.mongoose;

var Schema = mongoose.Schema;

var Article = new Schema({
	userid : Number,
	title : {type:String,max:30},
	content : {type:String},
	timestamp : {type:Date,default:Date.now()},
	images : { type:[String]}, 
	visiCount : { type:Number}, 
	commCount : { type:Number}, 
	classid : { type:Number}
});
	//访问模型
	var mblog=__.getOrCreateModel('blog_article', Article);
	
	//实例
// var dit={userid:1,title:'testname',content:'this is content'};
getDbCont();

function getDbCont(){
	mblog.find({}, function(err, data) {
		if (err) {
			console.log('render err');
		} else {
			console.log('\033[31m show data:\033[0m',data);
		}
	})
}

return {a:function(){}}

};
