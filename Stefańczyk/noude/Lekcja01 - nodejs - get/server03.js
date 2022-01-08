var http = require("http");
var server = http.createServer(function(req,res){
    console.log("nagłówki żądania: " )
    console.log(JSON.stringify(req.rawHeaders,null,5));
    console.log(JSON.stringify(req.headers,null,5));
    res.writeHead(200,{"content-type":"application/json;charset=utf-8"})
    res.end(JSON.stringify(req.headers,null,5))
})

server.listen(3000,function(){
    console.log("serwer startuje na porcie 3000");
});