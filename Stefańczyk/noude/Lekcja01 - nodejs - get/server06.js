var http = require("http");
var server = http.createServer(function(req,res){
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"})
    if(req.url == "/A"){
        console.log("kolorowe A");
    }
    else if(req.url == "/B"){
        console.log("kolorowe B");
    }
    else if(req.url == "/C"){
        console.log("Kolorowe C");
    }
})

server.listen(3000,function(){
    console.log("serwer startuje na porcie 3000");
});