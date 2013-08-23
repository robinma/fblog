/**
 * @author robin ma
 */
exports.init = function(param) {
	var __=this;
	var tpl = __.getTpl(param.tpl, function(data) {
		reJoinTpl(data);
	});

	var reJoinTpl = function(data) {
		__.render(data, {});
	}

}