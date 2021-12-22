var express = require("express")
var app = express()
const PORT = 3000;
var path = require("path")
const bodyParser = require("body-parser")

app.use(express.static('static')) // pliki strony

app.use(bodyParser.urlencoded({ extended: true }));

//nasłuch na określony port
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/formularz2.html"))
});
app.post("/formularz2", function (req, res) {
    console.log(req.body.color)
    let color = req.body.color
    let body = `<body style='background-color:${color};color:'white';height:'100%''>${color}</body>`
    res.send(body)
})
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})