var http = require("http");
var logger = require('tracer').colorConsole();
var server = http.createServer(function(req,res){
    logger.log('hello');
    logger.trace('hello');
    logger.debug('hello');
    logger.info('hello');
    logger.warn('hello');
    logger.error('hello');
})

server.listen(3000,function(){
    console.log("serwer startuje na porcie 3000");
});