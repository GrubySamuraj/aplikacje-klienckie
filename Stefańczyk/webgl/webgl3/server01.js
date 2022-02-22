var express = require("express")
var app = express();
var fs = require("fs");
app.use(express.static('static')) // serwuje stronę index.html
app.use(express.static('static/cwiczenia')) // serwuje pozostałe pliki, czyli ćwiczenia
app.get("/cwiczenia", function (req, res) {
    fs.readdir((__dirname + "\\static\\cwiczenia"), function (err, files) {
        if (err) {
            return console.log(err);
        }
        console.log(files);
        res.send(files);
    });
});
//nasłuch na określony port

// export 'app'
module.exports = app