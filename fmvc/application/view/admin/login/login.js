/**
 * @author jerry
 */

module.exports = function() {
	
	
	this.setMeta = function() {

		return {
			title:'login',
			Keywords:'',
			'description':''
		}
	};

	this.setCss = function() {
		return {
			fileList : ['common/base.css'],

		};
	}

	this.setJs = function() {
		return {
			title:'',
			fileList : {}
		}
	}
}
