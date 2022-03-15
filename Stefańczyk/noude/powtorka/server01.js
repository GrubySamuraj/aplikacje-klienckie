const http = require("http");
const fs = require("fs");
const PORT = 3000;
const server = http.createServer((req, res) => {
    console.log("nagłowki żądania:")
    console.log(JSON.stringify(req.rawHeaders, null, 5))
    console.log(JSON.stringify(req.headers, null, 5))
    let przegldarka = "";
    if(req.headers["user-agent"].match(".*Firefox.*")){
        console.log("Przeglądarka to firefox");
        przegldarka = "firefox";
    }
    else if(req.headers["user-agent"].match(".*Chrome.*")){
        console.log("Przeglądarka to chrome");
        przegldarka = "chrome";
    }
    else{
        console.log("jest to inna przeglądarka");
        przegldarka = "inna przeglądarka"
    }
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
    res.end(`<h1>Jest to ${przegldarka}</h1>`);
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});