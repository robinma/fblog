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
		tpl:'welcome.html',
	},
	//home
	'blog':{
		url:/\/blog\/?$/i,
		controller:'home',
		action:'init',
		tpl:'blog/home/main.html',
	},
	
	
}

//遍历装箱
for(var i in setting){
	sroute.map(setting[i]);
}

console.log('=====','load client map success');
