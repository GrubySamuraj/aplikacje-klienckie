var fs = require("fs");
var http = require("http");
var formidable = require("formidable")
const path = require("path");
const fsPromises = require("fs").promises;
let body="";
const form = formidable({});
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
    const dirs = async () => {
        try {
            const data = await fsPromises.readdir(filepath);
            for (let i = 0; i < data.length; i++) {
                const stat = await fsPromises.lstat(`${filepath}/${data[i]}`);
                obj = {
                    file: data[i],
                    type: stat.isDirectory()
                }
                datas.push(obj);
            }
        } catch (error) {
            console.log(error);
        }
        for(let x = 0; x < datas.length; x++){
            for (let y = 0; y < datas.length - 1; y++) {
                if(datas[y].type == true){
                    pom = datas[y];
                    datas[y] = datas[y + 1]
                    datas[y + 1] = pom
                }
            }
        }
        datas.reverse();
        response.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        response.end(JSON.stringify(datas, null, 5));
    }
    form.uploadDir = "static/upload/";
    form.parse(request, function (err, fields, files) {
        let datas = [];
        fs.rename(`${files.file.path}`, `${files.file.path}/../${files.file.name}`,  (err)=> {
            if (err) throw err
        });
        datas.push(`${files.file.path}/../${files.file.name}`);
        console.log(datas);
        response.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
        response.end(`${files.file.path}/../${files.file.name}`);
    });
}