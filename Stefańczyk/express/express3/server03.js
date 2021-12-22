var express = require("express")
var app = express()
const PORT = 3000;
const bodyParser = require("body-parser")
var path = require("path")

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index4.html"))
});
app.post("/post", function (req, res) {
    console.log(req.body)
    let x = parseInt(req.body.x) + 200
    let y = parseInt(req.body.y)
    let czas = req.body.czas
    console.log(x, y)
    let operacje = {
        posx: x,
        posy: y,
        czas: czas
    }
    res.send(operacje);
});
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})