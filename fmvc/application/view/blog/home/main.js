/**
 * @author robin ma
 */
module.exports = function() {
	
	
	this.setMeta = function() {

		return {
			title:'首页',
			Keywords:'',
			'description':''
		}
	};

	this.setCss = function() {
		return {
			fileList : ['common/base.css','common/common.css','blog/main.css']

		};
	}

	this.setJs = function() {
		return {
			fileList : []
		}
	}
}
