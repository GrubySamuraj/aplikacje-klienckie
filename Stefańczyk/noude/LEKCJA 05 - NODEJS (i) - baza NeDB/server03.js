var fs = require("fs");
var http = require("http");
const Datastore = require('nedb');

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
    const coll1 = new Datastore({
        filename: 'kolekcja3.db',
        autoload: true
    });

    let body = "";
    request.on("data",function(data){
        console.log(data);
        body += data.toString();
    });

    request.on("end",function(){
        let doc = {
            ubezpieczony: body.ubezpieczony == true ? "TAK" : "NIE",
            benzyna: body.benzyna == true ? "TAK" : "NIE",
            uszkodzony: body.uszkodzony == true ? "TAK" : "NIE",
            naped: body.naped == true ? "TAK" : "NIE"
        }
        coll1.insert(doc, function (err, newDoc) {
            console.log("dodano dokument (obiekt):")
            console.log(newDoc)
            console.log("losowe id dokumentu: "+newDoc._id)
        });
        console.log(body);
        response.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        response.end(JSON.stringify(body, null, 5));
    });
}