var express = require("express")
var app = express()
const PORT = 3000;

app.get("/", function (req, res) {
    res.send("<b>dane html odesłane z serwera do przeglądarki</b>");
})
//nasłuch na określonym porcie

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})