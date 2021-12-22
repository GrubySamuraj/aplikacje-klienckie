var express = require("express")
var app = express()
const PORT = 3000;
var path = require("path")

// app.use(express.static('static')) // pliki strony


//nasłuch na określony port
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/formularz.html"))
});
app.get("/formularz", function (req, res) {
    console.log(req.query)
    let color = req.query.color
    let div = `<body style='background-color:${color};color:'white';height:'100%''>${color}</body>`
    res.send(div)
})
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})