var fs = require("fs");
var http = require("http");
var formidable = require("formidable");
var server = http.createServer(function(request,response){
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

server.listen(3000,function(){
    console.log("serwer startuje na porcie 3000");
});
function pageResponse(request, response){
    if(request.url == "/"){
        fs.readFile("static/index.html", function (error, data) {
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
function serverResponse(request, response){
    const form = formidable({});
    form.uploadDir = "static/upload/"

    form.parse(request, function (err, fields, files) {
        response.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
        response.end('<h1>file uploaded!</h1>');
    });
}