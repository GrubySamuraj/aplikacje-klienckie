var express = require("express")
var app = express();
var fs = require("fs");
app.use(express.static('static')) // serwuje stronę index.html
app.get("/cwiczenia", function (req, res) {
    fs.readdir(("static/cwiczenia"), function (err, files) {
        if (err) {
            return console.log(err);
        }
        console.log(files);
        res.send(files);
    });
});
// export 'app'
module.exports = app