var express = require("express")
var app = express()
const PORT = 3000;
var path = require("path");
var hbs = require('express-handlebars');

const context = {
    lektura1: "Zamek",
    lektura2: "Lalka",
    lektura3: "Hamlet",
    lektura4: "Pan Wołodyjowski"
}

app.use(express.static("static"));

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main2.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

app.get("/", function (req, res) {
    res.render("view4.hbs", context)
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})