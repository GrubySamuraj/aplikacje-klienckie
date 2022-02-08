var http = require("http");
var server = http.createServer(function(req,res){
    // parametr res oznacza obiekt odpowiedzi serwera (response)
    // parametr req oznacza obiekt żądania klienta (request)
})

server.listen(3000,function(){
    console.log("serwer startuje na porcie 3000");
});