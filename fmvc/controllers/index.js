/**
 * @author robin ma
 */
console.log('im index.js in controllers');

exports.init=function(param){
	
	console.log('是我');
	this.render(param.tpl,{});
}
