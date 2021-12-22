var express = require("express")
var app = express()
const PORT = 3000;
const bodyParser = require("body-parser")
var path = require("path")

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index2.html"))
});

app.post("/post", function (req, res) {
    console.log(req.body)
    let input1 = req.body.a;
    operacje= {
        input1:input1
    }
    res.send(operacje);
});

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})
