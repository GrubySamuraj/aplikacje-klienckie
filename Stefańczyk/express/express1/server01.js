var express = require("express")
var app = express()
const PORT = 3000;

app.use(express.static('static')) // pliki strony


//nasłuch na określony port
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
    console.log("Witaj");
})