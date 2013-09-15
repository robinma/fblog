/**
 * @author robin ma
 */
module.exports = function(callback) {
	var __ = this;
	var db = this.db;
	var mongoose = this.mongoose;

	var Schema = mongoose.Schema;

	var user = new Schema({
		id : {
			type : String,
			default : __.getId
		},
		username : String,
		password : String,
		power : Number
	});

	//访问模型
	var user = __.getOrCreateModel('usertable', user);

	// var data = {
		// username : 'admin',
		// password : 'admin',
		// power : '1000'
	// };
	// var userEnt = new user(data);
	// userEnt.save(function(err,data) {
		// console.log(arguments,'test it')
		// frog.log.ok(__.getId(),'已保存---b');
		// findDate();
	// });
	
	var findDate = function() {
		user.find({}, function(err, data) {
			console.log(data)
		})
	}
	
	findDate();
}