var express = require("express")
var app = express()
const PORT = 3000;
var path = require("path")

// pliki strony
app.get("/index01", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"))
})
app.get("/index02", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index2.html"))
})
app.get("/index03", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index3.html"))
})

//nasłuch na określony port
app.use(express.static('static'))
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
    console.log("Witaj");
    console.log("ścieżka do katalogu głównego aplikacji: " + __dirname);
})