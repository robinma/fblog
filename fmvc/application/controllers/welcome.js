/**
 * @author robin ma
 */
exports.init = function(param) {
	var __ = this;

	__.getView(param.tpl, function(data) {
		reJoinTpl(data);
	});

	var reJoinTpl = function(data) {
		__.render(data, {});
	}
}