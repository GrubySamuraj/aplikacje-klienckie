var express = require("express")
var app = express()
const PORT = 3000;
const bodyParser = require("body-parser")
var path = require("path")

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index3.html"))
});
app.post("/post", function (req, res) {
    console.log(req.body);
    let left = parseInt(req.body.lewy);
    let top = parseInt(req.body.top);
    let start = parseInt(req.body.start);
    left+=500
    let operacje = {
        left:left,
        top:top,
        start:start
    }
    res.send(operacje);
});
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})