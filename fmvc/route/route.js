/**
 * @author robin ma
 */
var sroute=require('../../server/modules/route.js');

// 首页
sroute.map({
	url:/\/blog\/?$/i,
	controller:'/',
	action:'init'
});


console.log('=====','load client map success');
