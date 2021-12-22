var express = require("express")
var app = express()
const PORT = 3000;
var path = require("path");
var hbs = require('express-handlebars');

app.use(express.static("static"));

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

app.get('/login', function (req, res) {
    res.render("login.hbs");
});
app.get('/index', function (req, res) {
    res.render("index.hbs");
});
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})