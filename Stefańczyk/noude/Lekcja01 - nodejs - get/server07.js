var http = require("http");
var server = http.createServer(function(req,res){
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"})
    if(req.url.toLowerCase() == "/a"){
        console.log("kolorowe A");
    }
    else if(req.url.toLowerCase() == "/b"){
        console.log("kolorowe B");
    }
    else if(req.url.toLowerCase() == "/c"){
        console.log("Kolorowe C");
    }
})

server.listen(3000,function(){
    console.log("serwer startuje na porcie 3000");
});