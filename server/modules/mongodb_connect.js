/**
 * @author robin ma
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/blog');

var db = mongoose.connection;

db.on('err', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('success', '===');
	//blog schema
	var blogSchema = new mongoose.Schema({
		name : String,
		title : String,
		id : Number
	});
	blogSchema.methods.speak = function() {
		console.log('my name is : ' + this.name);
	}
	var blogModel = db.model('blogtest', blogSchema);

	var blogEntity = new blogModel({
		name : 'marinArticle',
		title:'this title is test----',
		id:1
	});
	blogEntity.save();
	blogEntity.speak();
	
	//console.log(blogEntity.find(),'====');
	//blogEntity.save();
	blogModel.find(function(err, blog) {
		if (err)
			donsole.log('--22---');
		console.log(blog, '===');
	});

});

