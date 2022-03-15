var http = require("http");
var fs = require("fs");

var server = http.createServer(function (request, response) {
    switch (request.method) {
        case "GET":
            //wyświetlenie strony html
            pageResponse(request, response);
            break;
        case "POST":
            // odbiór posta
            serverResponse(request, response);
            break;
    }
});
server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000");
});
function serverResponse(req, res) {
    let body = "";
    req.on("data",function(data){
        body+=data.toString();
    });
    req.on("end",function(){
        console.log(body)
        const params = new URLSearchParams(body);
        const finishObj = Object.fromEntries(params);
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(finishObj, null, 5));
    });
};
function pageResponse(request, response) {
    if (request.url == "/") {
        fs.readFile("static/index2.html", function (error, data) {
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
}