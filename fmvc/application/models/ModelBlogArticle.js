/**
 * @author jerry
 */
module.exports = function() {
	var db = this.db;
	var mongoose = this.mongoose;

	var Schema = mongoose.Schema;

	var Article = new Schema({
		userid : {type:Number},
		title : {type:String,max:30},
		content : {type:String},
		timestamp : {type:Date,default:Date.now},
		images : {type:[String]},
		visiCount : {type:Number},
		commCount : {type:Number},
		classid : {type:Number}
	});

}
