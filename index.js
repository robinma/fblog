/**
 * @author robin ma
 * 
 */
var server=require('./server/modules/server');
var route=require('./server/modules/router');
var requestHandlers=require("./server/modules/requestHandlers");

var handle={};
handle['/']=requestHandlers.start;
handle['/start']=requestHandlers.start;
handle['/upload']=requestHandlers.upload;

server.start(route.route,handle);

