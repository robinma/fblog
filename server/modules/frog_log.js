/**
 * @author jerry
 */
var exp={};
exp.log={};

function logProt(arg,s,e){
	Array.prototype.unshift.call(arg,s);
	Array.prototype.push.call(arg,e);
	console.log.apply(console,arg);
}

exp.log.err=function(){
	var s='\033[31m',e='\033[0m';
	logProt(arguments,s,e);
}
exp.log.ok=function(){
	var s='\033[32m',e='\033[0m';
	logProt(arguments,s,e);
}
exp.log.berr=function(){
	var s='\033[41m',e='\033[0m';
	logProt(arguments,s,e);
}
exp.log.bok=function(){
	var s='\033[42m',e='\033[0m';
	logProt(arguments,s,e);
}

module.exports=exp;