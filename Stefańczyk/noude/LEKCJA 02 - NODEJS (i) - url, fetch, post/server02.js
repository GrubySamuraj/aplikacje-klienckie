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

    //kiedy przychodzą dane postem, w postaci pakietów
    //łącza się do jednej zmiennej "body"

    req.on("data", function (data) {
        console.log("data: " + data)
        body += data.toString();
    })

    //kiedy przyjdą już WSZYSTKIE dane
    //parsujemy je do obiektu
    //i odsyłamy do przeglądarki

    req.on("end", function (data) {
        console.log(body)
        const params = new URLSearchParams(body);
        console.log(params);
        let finishObj = Object.fromEntries(params);
        let suma = parseInt(finishObj.txt1) + parseInt(finishObj.txt2);
        let iloczyn = parseInt(finishObj.txt1) * parseInt(finishObj.txt2);
        const operations = {
            suma: suma,
            iloczyn: iloczyn
        }
        finishObj = Object.assign(finishObj, operations)
        console.log(finishObj);
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(finishObj, null, 5));
    })

};
function pageResponse(request, response) {
    if (request.url == "/") {
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
}