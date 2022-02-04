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
        const rawObj = Object.fromEntries(params);
        let operations = []
        if (rawObj.operacje == "suma") {
            message = "suma dwóch elementów"
            wynik = parseInt(rawObj.txt1) + parseInt(rawObj.txt2)
            operations = { wynik: wynik, message: message }
        }
        else if (rawObj.operacje == "iloczyn") {
            message = "iloczyn dwóch elementów"
            wynik = parseInt(rawObj.txt1) * parseInt(rawObj.txt2)
            operations = { wynik: wynik, message: message }
        }
        else if (rawObj.operacje == "różnica") {
            message = "różnica dwóch elementów"
            wynik = parseInt(rawObj.txt1) - parseInt(rawObj.txt2)
            operations = { wynik: wynik, message: message }
        }
        else if (rawObj.operacje == "iloczyn") {
            message = "iloczyn dwóch elementów"
            wynik = parseInt(rawObj.txt1) * parseInt(rawObj.txt2)
            operations = { wynik: wynik, message: message }
        }
        else if (rawObj.operacje == "iloraz") {
            message = "iloraz dwóch elementów"
            wynik = parseInt(rawObj.txt1) / parseInt(rawObj.txt2)
            operations = { wynik: wynik, message: message }
        }
        else {
            message1 = "suma dwóch elementów"
            wynik1 = parseInt(rawObj.txt1) + parseInt(rawObj.txt2)
            operations1 = { wynik: wynik1, message: message1 }
            message2 = "różnica dwóch elementów"
            wynik2 = parseInt(rawObj.txt1) - parseInt(rawObj.txt2)
            operations2 = { wynik: wynik2, message: message2 }
            message3 = "iloczyn dwóch elementów"
            wynik3 = parseInt(rawObj.txt1) * parseInt(rawObj.txt2)
            operations3 = { wynik: wynik3, message: message3 }
            message4 = "iloraz dwóch elementów"
            wynik4 = parseInt(rawObj.txt1) / parseInt(rawObj.txt2)
            operations4 = { wynik: wynik4, message: message4 }

            operations.push(operations1);
            operations.push(operations2);
            operations.push(operations3);
            operations.push(operations4);
        }


        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(operations, null, 5));
    })

};
function pageResponse(request, response) {
    if (request.url == "/") {
        fs.readFile("static/third.html", function (error, data) {
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