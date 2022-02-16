var fs = require("fs");
var http = require("http");
var formidable = require("formidable")
const path = require("path");
const filepath = path.join(__dirname, "node_modules/colors");
const fsPromises = require("fs").promises;
const form = formidable({});
let body="";
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
function serverResponse(request, response){
    request.on("data", function (data) {
        if(typeof(data) == "object"){
            body += data.toString();
        }
    });
    request.on("end",function(){
        form.uploadDir = "static/upload/";
        form.on("file", function () {
            console.log("plik otrzymany!");
        });
        form.parse(request, function (err, fields, files) {
            console.log("plik zapisany!");
            // response.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
            // response.end('wszystkich bajtów w formularzu:' + form.bytesExpected + " / " + form.bytesReceived + " bytes");
        });
    })
}