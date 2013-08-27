/**
 * @author jerry
 */

module.exports = function() {
	
	
	this.setMeta = function() {

		return {
			title:'',
			Keywords:'',
			'description':''
		}
	};

	this.setCss = function() {
		return {
			fileList : ['common/base.css','index.css'],

		};
	}

	this.setJs = function() {
		return {
			title:'',
			fileList : {}
		}
	}
}
