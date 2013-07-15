/**
 * @author robin ma
 * 
 */
var server=require('./modules/server');
var route=require('./modules/router');
var requestHandlers=require("./modules/requestHandlers");

var handle={};
handle['/']=requestHandlers.start;
handle['/start']=requestHandlers.start;
handle['/upload']=requestHandlers.upload;

server.start(route.route,handle);
/*test version 0.13.7.05*/