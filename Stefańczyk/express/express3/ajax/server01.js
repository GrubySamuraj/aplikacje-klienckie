var express = require("express")
var app = express()
const PORT = 3000;
const bodyParser = require("body-parser")
var path = require("path")

app.use(express.static('static'))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    console.log(__dirname + "/static/index.html");
    res.sendFile(path.join(__dirname + "/static/index.html"))
});
app.post("/post", function (req, res) {
    console.log(req.body)
    let a = parseInt(req.body.a)
    let b = parseInt(req.body.b)
    suma = a + b
    iloczyn = a * b
    // console.log(suma);
    let operacje = {
        suma: suma,
        iloczyn: iloczyn
    }
    res.send(operacje);
});
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})