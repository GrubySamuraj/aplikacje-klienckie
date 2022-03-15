const http = require("http");
const fs = require("fs");
const PORT = 3000;
const server = http.createServer((req, res) => {
    fs.readFile("static/index.html", function (error, data) {       
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
            res.end();
        }

        else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
});
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});