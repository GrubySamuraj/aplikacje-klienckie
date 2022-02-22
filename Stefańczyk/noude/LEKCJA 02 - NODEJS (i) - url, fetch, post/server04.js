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
    req.on("data", function (data) {
        body += data.toString();
    })

    req.on("end", function () {
        const params = new URLSearchParams(body);
        const finishObj = Object.fromEntries(params);
        console.log(finishObj);
        let operations = [];
        if (finishObj.select == "suma") {
            message = "suma dwóch elementów"
            wynik = parseInt(finishObj.txt1) + parseInt(finishObj.txt2)
            operations = { wynik: wynik, message: message }
        }
        else if (finishObj.select == "iloczyn") {
            message = "iloczyn dwóch elementów"
            wynik = parseInt(finishObj.txt1) * parseInt(finishObj.txt2)
            operations = { wynik: wynik, message: message }
        }
        else if (finishObj.select == "różnica") {
            message = "różnica dwóch elementów"
            wynik = parseInt(finishObj.txt1) - parseInt(finishObj.txt2)
            operations = { wynik: wynik, message: message }
        }
        else if (finishObj.select == "iloczyn") {
            message = "iloczyn dwóch elementów"
            wynik = parseInt(finishObj.txt1) * parseInt(finishObj.txt2)
            operations = { wynik: wynik, message: message }
        }
        else if (finishObj.select == "iloraz") {
            message = "iloraz dwóch elementów"
            wynik = parseInt(finishObj.txt1) / parseInt(finishObj.txt2)
            operations = { wynik: wynik, message: message }
        }
        else {
            message1 = "suma dwóch elementów"
            wynik1 = parseInt(finishObj.txt1) + parseInt(finishObj.txt2)
            operations1 = { wynik: wynik1, message: message1 }
            message2 = "różnica dwóch elementów"
            wynik2 = parseInt(finishObj.txt1) - parseInt(finishObj.txt2)
            operations2 = { wynik: wynik2, message: message2 }
            message3 = "iloczyn dwóch elementów"
            wynik3 = parseInt(finishObj.txt1) * parseInt(finishObj.txt2)
            operations3 = { wynik: wynik3, message: message3 }
            message4 = "iloraz dwóch elementów"
            wynik4 = parseInt(finishObj.txt1) / parseInt(finishObj.txt2)
            operations4 = { wynik: wynik4, message: message4 }

            operations.push(operations1);
            operations.push(operations2);
            operations.push(operations3);
            operations.push(operations4);
        }
        console.log(operations);
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(operations, null, 5));
    })

};
function pageResponse(request, response) {
    if (request.url == "/") {
        fs.readFile("static/fourth.html", function (error, data) {
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