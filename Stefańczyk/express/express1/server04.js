var express = require("express")
var app = express()
const PORT = 3000;

app.get('/', function (req, res) {
    console.log(req.query) // to jest obiekt z danymi pobranymi z paska adresu    
    console.log(req.query.p1) // to jest jedno pole (właściwość) tego obiektu   
    res.send(req.query) // odesłanie obiektu z danymi z powrotem do przeglądarki   
});

//nasłuch na określonym porcie

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})