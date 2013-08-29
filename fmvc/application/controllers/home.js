/**
 * @author robin ma
 */
exports.init=function(param){
	var __=this;
	var collTpl={};
	var mongo=__.getDB();
	var db=mongo.db;
	db.once('open',function(){
		console.log('--------------- i is open');
	})
	
	
	
	//get component of top
	__.getComponent('global_maintop',function(data){
		collTpl.top=data;
		
		__.getComponent('global_bottom',function(data){
			getMainTpl();
		})
	});
	
	
	var getMainTpl=function(){
	//	var mod=__.getDB('Model_blog_article');
		
		__.getView(param.tpl,function(data){
			reJoinTpl(data);
		});
	}
	
	var reJoinTpl=function(data){
		var hTpl=collTpl.top+data+collTpl.bottom;
		__.render(hTpl,{});
	}
	
}
