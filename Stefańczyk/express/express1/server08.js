var express = require("express")
var app = express()
const PORT = 3000;

app.get('/', function (req, res) {
    console.log(req.query.count);
    let color = req.query.bg;
    let div = ""
    for(let x= 0; x<req.query.count; x++){
        div+=`<div style="background-color:${color};height: 50px;width: 50px;"></div>`
    }
    res.send(div);
});

//nasłuch na określonym porcie

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})