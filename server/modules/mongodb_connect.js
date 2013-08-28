/**
 * @author robin ma
 */

var conf={
	'host':'mongodb://127.0.0.1',
	dbname:'blog',
	port:27017
	
}

var mongoose = require('mongoose');

var conHref=conf.host+(conf.port?':'+conf.port+"/":"/")+conf.dbname;
mongoose.connect(conHref);
var db = mongoose.connection;
db.on('err', console.error.bind(console, 'connection error:'));

