var http = require("http");
var server = http.createServer(function(req,res){
    console.log("adres żądania: " + req.url)
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"})
    res.end("<h1> Adres żądania to: "+req.url+"</h1>")
})

server.listen(3000,function(){
    console.log("serwer startuje na porcie 3000");
});