/**
 * @author robin ma
 */
/**
 * controller context Class
 */
var cct = require('../../../server/modules/controllerContext');

//
var welcome = require('../controllers/welcome');

module.exports = function(app) {

	app.get('/', function() {

		welcome.init.call(new cct, {
			tpl : 'welcome',
		});
		console.log('this is blog')
	});

}
