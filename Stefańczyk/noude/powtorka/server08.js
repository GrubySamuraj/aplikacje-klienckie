var formidable = require("formidable");
const form = formidable({});
form.uploadDir = "static/upload/"
var http = require("http");
var fs = require("fs");
let nazwazdj = "";
let type = "";
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
    const cos = async() => {
        let body = "";
        let newpath = "";
        if(req.url === "/filename"){
            req.on("data",function(data){
                body += data.toString();
            });
        }
        else if(req.url === "/postfile"){
            let filename = "";
            form.parse(req, function (err, fields, files) {
                type = files.file.type
                nazwazdj = files.file.name;
                newpath = `${files.file.path}../../${files.file.name}`
                filename = newpath;
                fs.rename(files.file.path,newpath, (err)=>{
                    if (err) throw err
                });
                console.log("udalo sie");
            });
        }
        req.on("end",function(){
            fs.rename(newpath,`${newpath}../../${body}`, (err)=>{
                if (err) throw err
            });
            res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
            res.end(JSON.stringify(`/static/upload/${body}`, null, 5));
        })
    }
cos();
};
function pageResponse(request, response) {
    if (request.url == "/") {
        fs.readFile("static/index5.html", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        })
    }
    else if(request.url == `/static/upload/${nazwazdj}`){
        fs.readFile(`static/upload/${nazwazdj}`, function (error, data) {
            response.writeHead(200, { 'Content-Type': 'image/jpg' });
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