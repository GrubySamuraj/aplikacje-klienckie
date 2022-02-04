var express = require("express")
var app = express();
var fs = require("fs");
const PORT = 3000;
app.use(express.static('static')) // serwuje stronę index.html
app.use(express.static('static/cwiczenia')) // serwuje pozostałe pliki, czyli ćwiczenia
app.get("/cwiczenia", function (req, res) { 
    fs.readdir(__dirname + "\\static\\cwiczenia", function (err, files) {
        console.log(__dirname + "\\static\\cwiczenia");
        if (err) {
            return console.log(err);
        }
        console.log(files);
        res.send(files);
    });
});
//nasłuch na określony port
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})