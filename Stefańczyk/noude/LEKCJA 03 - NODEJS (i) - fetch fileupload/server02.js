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
    const form = formidable({});
    form.uploadDir = "static/upload/";
    let begin = 0;
    let end = 0;
    let czas = 0
    
    form.on("file", function () {
        console.log("file" + new Date().getTime())
    })

    form.on("progress", function (bytesReceived, bytesExpected) {
        console.log("progress ", (Math.floor(bytesReceived/bytesExpected * 100)) + "%");
    })

    form.on("fileBegin", function (name, value) {
        begin = new Date().getTime();
        console.log("fileBegin: " + begin);
    })

    form.on("end", function () {
        end = new Date().getTime();
        console.log("end: " + end);
        czas = end - begin;
        console.log("czas: ", czas);
        response.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
        response.end(`czas to: ${czas}`);
    });
    form.parse(request, function (err, fields, files) {
        response.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
        response.end('wszystkich bajtów w formularzu:' + form.bytesExpected + " / " + form.bytesReceived + " bytes");
    });
}