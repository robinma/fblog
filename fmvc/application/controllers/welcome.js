/**
 * @author robin ma
 */
exports.init = function(param) {
	var __ = this;

	__.getView(param.tpl, function(data) {
		reJoinTpl(data);
	});

	console.log('-----this is welcome page controllers ')

	var reJoinTpl = function(data) {
		__.render(data, {});
	}
}