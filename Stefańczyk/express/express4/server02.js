var express = require("express")
var app = express()
const PORT = 3000;
var path = require("path");
var hbs = require('express-handlebars');

const context = {
    subject: "ćwiczenie 2 - podstawowy context",
    content: "to jest TREŚĆ mojej strony",
    footer: "to jest stopka na mojej stronie"
}

app.use(express.static("static"));

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main2.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

app.get("/", function (req, res) {
    res.render("view3.hbs", context)
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})