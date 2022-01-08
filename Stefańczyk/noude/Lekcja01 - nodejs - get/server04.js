var http = require("http");
var server = http.createServer(function(req,res){
    res.writeHead(200,{"content-type":"application/json;charset=utf-8"})
    res.writeHead(200,{"content-type":"text/html;charset=utf-8"})
    let zmienna = req.headers["user-agent"];
    let Wiadomosc = 0
    // console.log(req.headers["user-agent"]);
    if (zmienna.includes("Firefox")){
        Wiadomosc = "Twoja przeglądarka to Firefox"
    }
    else if(zmienna.includes("Chrome")){
        Wiadomosc = "Twoja przeglądarka to Chrome"
    }
    else{
        Wiadomosc = "Twoja przeglądarka jest inna niż Chrome i Firefox"
    }
    res.end("<h1>"+ Wiadomosc +"</h1>")
})

server.listen(3000,function(){
    console.log("serwer startuje na porcie 3000");
});