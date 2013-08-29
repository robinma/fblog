/**
 * @author robin ma
 */
var fs = require('fs');

var cpage = function(req, res) {
	this.req = req;
	this.res = res;
};

var cproto = cpage.prototype;

cproto['getTemplate'] = function(pathname, callback) {
	var __ = this;
	fs.exists(pathname, function(exists) {
		if (!exists) {
			__.res.writeHead(404, {
				'Content-Type' : 'text/plan; charset=utf-8'
			});
			__.res.end('Page Not Found');
		} else {

			fs.readFile(pathname, 'utf8', function(err, data) {
				if (err) {
					__.res.writeHead(500, {
						'Content-Type' : 'text/plain; charset=utf-8'
					});
					__.res.end(err);
				}
				if ( typeof callback === 'function') {
					callback(data);
				};
			})
		}
	});
};
//get view template
cproto['getTplPath'] = function() {
};

cproto['render'] = function() {
};


cproto['setMeta'] = function() {};
cproto['setCss'] = function() {};
cproto['setJs'] = function() {};

cproto['getHeadInfo']=function(){
	
	var mate=this.setMeta();
	var title='风的沙子';
	var Keywords='博客';
	var Description='个人博客，风的沙子，前端技术';
	var html=[];
	var globalCss=[];
	var globalJs=[];
	
	html.push('<!DOCTYPE html>\
<html>\
	<head>\
		<meta charset=UTF-8 />\
		<link rel="shortcut icon" href="favicon.ico">\
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />');
		
	html.push('<title>'+(mate['title']?mate['title']+'-'+title:title)+'</title>');
	
	html.push('<meta name="Keywords" content="{kd}" />'.replace(/{kd}/ig,function(){
		return mate.keywords?mate.keywords+','+Keywords:Keywords
	}));
	
	html.push('<meta name="Description" content="{ds}" />'.replace(/{ds}/ig,function(){
		return mate.Description?mate.Description+','+Description:Description
	}));
	
	globalCss.forEach(function(val){
		html.push('<link href="/css/'+val+'" rel="stylesheet" type="text/css" />');
	});
	html.push(this.getCss());
	globalJs.forEach(function(val){
		html.push('<script src="/js/'+val+'" type="text/javascript"></script>');
	});
	html.push(this.getJs());
	html.push('</head>\
<body>');
	return html.join('');
};
cproto['getTail']=function(){
	return '</body>\
</html>';
}
cproto['getCss']=function(){
	var html=[],css=this.setCss();
	if(!css.fileList.length)return '';
	css.fileList.forEach(function(val){
		html.push('<link href="/css/'+val+'" rel="stylesheet" type="text/css" />');
	});
	return html.join('');
};

cproto['getJs']=function(){
	var html=[],js=this.setJs();
	if(!js.fileList.length)return '';
	globalJs.forEach(function(val){
		html.push('<script src="/js/'+val+'" type="text/javascript"></script>');
	});
	return html.join('');
};
module.exports = cpage;
