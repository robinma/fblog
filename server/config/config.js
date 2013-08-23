/**
 * @author robin ma
 */
exports.Expires={
	fileMatch:/^(gif|png|jpg|js|css)$/ig,
	maxAge:604800
}

exports.fPath={
	controllers:'../../fmvc/application/controllers/',//控制台根目标路径
	staticFilesDir:'../../fmvc/static',
	tplFilesDir:'../../fmvc/application/view',
	componentDir:'../../fmvc/application/component/'
}
