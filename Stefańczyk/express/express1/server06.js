var express = require("express")
var app = express()
const PORT = 3000;

app.get('/', function (req, res) {
    let value = req.query.value;
    let degToRad = req.query.degToRad;
    let str = 0;
    if (degToRad == "true") {
        str = value + " stopni = " + (value * 3.14) / 180 + " radianów"
    }
    else if (degToRad == "false") {
        str = value + " radianów = " + (value * 180) / 3.14 + " stopni"
    }
    res.send(str)
    console.log(str);
    console.log(value);
    console.log(degToRad);
});

//nasłuch na określonym porcie

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})