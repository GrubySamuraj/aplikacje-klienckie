var express = require("express")
var app = express()
const PORT = 3000;
const bodyParser = require("body-parser")
var path = require("path")

app.use(express.static('static'))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//nasłuch na określony port
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"))
});
app.post("/post", function (req, res) {
    let index1 = req.body.a + "%";
    let operacje = {
        input1: index1
    }
    res.send(operacje);
});
app.post("/post2", function (req, res) {
    let index2 = req.body.b + "%";
    let operacje = {
        input2: index2
    }
    res.send(operacje);
});
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
    console.log("Witaj");
})
