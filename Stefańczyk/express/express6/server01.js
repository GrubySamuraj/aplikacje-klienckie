var express = require("express")
var app = express()
const PORT = 3000;
var path = require("path");
var hbs = require('express-handlebars');
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

app.use(express.static("static"));

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');
let user = {};
let users = [];
let women = [];
let men = [];
let rosnaco = [];
let malejaco = [];
let login = false;
let pomlogin = 0;
let pomlogin1 = 0;
const context = {users:users};
const context2 = {women:women,men:men}
const context3 = {rosnaco:rosnaco,malejaco:malejaco}

app.get('/', function (req, res) {
    res.render("index.hbs");
});
app.get('/register', function (req, res) {
    res.render("register.hbs");
});
app.post("/register", function (req, res) {
    pomlogin = 0;
    user = {
        id: users.length + 1,
        login: req.body.login,
        haslo: req.body.password,
        wiek: req.body.wiek,
        uczen: req.body.uczen,
        plec: req.body.plec
    }
    for(let i = 0; i < users.length; i++){
        if(users[i].login != user.login){
            pomlogin++
        }
    }
    if (pomlogin == users.length){
        users.push(user);
        res.send(`<script>alert("Udało się zarejestrować!"); window.location.href = "/register"; </script>`);
    }
    else{
        res.render("userexits.hbs");
    }
    console.log(users);
});
app.get('/login', function (req, res) {
    res.render("login.hbs");
});
app.post("/login",function(req,res){
    pomlogin1 = 0;
    user = {
        login: req.body.login,
        haslo: req.body.password
    }
    for(let i = 0; i < users.length; i++){
        if(users[i].login == user.login && users[i].haslo == user.haslo){
            pomlogin1++
            console.log("test: ",users[i]);
        }
    }
    if (pomlogin1 == 1){
        login = true;
        res.send(`<script>alert("Udało się zalogować!"); window.location.href = "/admin"; </script>`);
    }
    else{
        res.send("Błędne hasło lub login!");
    }
})
app.get('/admin', function (req, res) {
    if(login == true){
        res.render("admin.hbs");
    }
    else{
        res.render("error.hbs");
    }
});
app.get("/logout",function(req,res){
    login = false;
    res.send(`<script>alert("Udało się wylogować!"); window.location.href = "/"; </script>`);
})
app.get('/sort', function (req, res) {
    if(login == true){
        res.render("adminpages/sort.hbs");
    }
    else{
        res.render("error.hbs");
    }
});
app.get('/gender', function (req, res) {
    if(login == true){
            for(let i = 0; i < users.length; i++){
                console.log(users[i]);
                console.log(women);
                console.log(men);
                if(users[i].plec == "K"){
                    women.push({id:users[i].id,plec:users[i].plec})
                }else{
                    men.push({id:users[i].id,plec:users[i].plec})
                }
                console.log(women);
                console.log(men);
            }
            console.log(context2);
        res.render("adminpages/gender.hbs", context2);
        women = [];
        men = [];
    }
    else{
        res.render("error.hbs");
    }
});
app.get('/show', function (req, res) {
    if(login == true){
        res.render("adminpages/show.hbs", context);
    }
    else{
        res.render("error.hbs");
    }
});
app.post('/sort', function (req, res) {
    if(req.body.sort == "rosnaco"){
        rosnaco = users.sort(function (a, b) {
            return parseFloat(a.wiek) - parseFloat(b.wiek);
        });
    }
    else{
        malejaco = users.sort(function (a, b) {
            return parseFloat(b.wiek) - parseFloat(a.wiek);
        });
    }
    console.log("rosnaco: ",rosnaco);
    console.log("malejaco: ",malejaco);
    res.render("adminpages/sort.hbs", context3);
    malejaco = [];
    rosnaco = [];
});
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})