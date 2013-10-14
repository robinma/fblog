/**
 * @author robin ma
 */
//
var welcome=require('../controllers/welcome');

module.exports=function(app){
	
	app.get('/blog',function(){
		//welcome.init();
		console.log('this is blog')
	});
	
}
