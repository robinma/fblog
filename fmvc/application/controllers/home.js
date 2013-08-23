/**
 * @author robin ma
 */
exports.init=function(param){
	var __=this;
	var collTpl={};
	
	//get component of top
	__.getComponent('global_maintop',function(data){
		collTpl.top=data;
		__.getComponent('global_bottom',function(data){
			collTpl.bottom=data;
			getMainTpl();
		})
	});
	
	
	var getMainTpl=function(){
		var tpl=__.getTpl(param.tpl,function(data){
			reJoinTpl(data);
		});
	}
	
	var reJoinTpl=function(data){
		var hTpl=collTpl.top+data+collTpl.bottom;
		__.render(hTpl,{});
	}
	
}
