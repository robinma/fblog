/**
 * @author robin ma
 */
/**
 * controller context Class
 */
var cct = require('../../../server/modules/controllerContext');

//
var welcome = require('../controllers/welcome');
var hsome=require('../controllers/home')

module.exports = function(app) {
	//首页
	app.get('/', function() {

		welcome.init.call(new cct, {
			tpl : 'welcome',
		});
		console.log('this is blog')
	});

	app.get('/home', function() {

		console.log('this is a test to route')

		home.init.call(new cct, {
			tpl : 'blog/home/main',
		});
		console.log('this is home')
	});


}
