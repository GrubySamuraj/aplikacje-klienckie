const http = require("http");
const fs = require("fs");
const PORT = 3000;
const server = http.createServer((request, response) => {
    console.log(`żądany przez przeglądarkę adres: ${decodeURIComponent(request.url)}`)
    if(decodeURIComponent(request.url) === "/index.html"){
        fs.readFile("static/index4.html", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        })
    }
    else{
        fs.readdir("static/", function (error, files) {
            for (i in files)
                if (decodeURIComponent(request.url) === "/" + files[i]) {
                    fs.readFile("static/" + files[i], function (error, data) {
                        let split = files[i].split(".")
                        let extension = split[split.length - 1]
                        console.log(extension);
                        response.writeHead(200, { 'Content-Type': extension });
                        response.write(data);
                        response.end();
                    })
                }
        })
    }
})
server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});