/**
 * @author robin ma
 */
var sroute=require('../../server/modules/route.js');

var setting={
	//home
	'index':{
		url:/\/blog\/?$/i,
		controller:'index',
		action:'init',
		tpl:'index1.html',
	},
	
	
}

//遍历装箱
for(var i in setting){
	sroute.map(setting[i]);
}

console.log('=====','load client map success');
