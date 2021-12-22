var express = require("express")
var app = express()
const PORT = 3000;

app.get('/', function (req, res) {
    let count = req.query.count
    let bg = req.query.bg
    let div = "";
    console.log(count);
    console.log(bg);
    for (let x = 0; x < count; x++) {
        console.log(x + 1);
        div += `<div style = background-color:${bg}; color:white;>${x + 1}</div>`
    }
    res.send(div)
});

//nasłuch na określonym porcie

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})