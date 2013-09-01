/**
 * @author robin ma
 */
var sroute=require('../../../server/modules/route.js');

var setting={
	//welcome
	'welcome':{
		url:/\/\/?$/i,
		controller:'welcome',
		action:'init',
		tpl:'welcome',
	},
	//home
	'blog':{
		url:/\/blog\/?$/i,
		controller:'home',
		action:'init',
		tpl:'blog_home_main',
	},
	//login admin
	'login':{
		url:/\/login\/?$/i,
		controller:'admin_login',
		action:'init',
		tpl:'admin_login_login'
	}
	
}

for(var i in setting){
	sroute.map(setting[i]);
}

console.log('=====','load client map success');
