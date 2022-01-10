var http = require("http");
var fs = require("fs");
var server = http.createServer(function(request,response){         
    if (request.url == "/index.html") {
        fs.readFile("static/index.html", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        })
    }
    else if (request.url == "/second.html") {
        fs.readFile("static/second.html", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        })
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write("<h1>404 - brak takiej strony</h1>");
        response.end();
    }
});

server.listen(3000,function(){
    console.log("serwer startuje na porcie 3000");
});