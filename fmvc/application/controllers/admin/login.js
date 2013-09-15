/**
 * @author robin ma
 */
exports.init = function(param) {
	var __ = this;
	var session=__.req.session;
	
	if(session.data.user!=='Guest'){
		//jump to other pages
		return false;
	};
	
	__.getDB('ModelUser',function(){
		
	});

	__.getView(param.tpl, function(data) {
		reJoinTpl(data);
	});

	var reJoinTpl = function(data) {
		__.render(data, {name:session.data.user});
	}
}