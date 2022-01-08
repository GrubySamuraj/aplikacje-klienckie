var http = require("http");
var server = http.createServer(function(req,res){
    res.writeHead(200,{"content-type":"audio/mpeg;charset=utf-8"})
    require("colors");

    console.log("tekst na czerwono".red)
    console.log("tekst na zielono".green)
    console.log("tekst na tęczowo".rainbow)
})

server.listen(3000,function(){
    console.log("serwer startuje na porcie 3000");
});