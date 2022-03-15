const http = require("http");
const fs = require("fs");
const PORT = 3000;
const server = http.createServer((req, res) => {
    console.log(`żądany przez przeglądarkę adres: ${req.url}` )
    console.log(`żądany przez przeglądarkę adres: ${req.url}` )
    
    if (req.url === "/index.html") {
        fs.readFile("static/index.html", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        })
    }
    else if (req.url === "/css/style.css") {
        fs.readFile("static/css/style.css", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.write(data);
            res.end();
        })
    }
    else if (req.url === "/js/script.js") {
        fs.readFile("static/js/script.js", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.write(data);
            res.end();
        })
    }
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});