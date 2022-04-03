var express = require("express")
var app = express();
var path = require("path")
const PORT = 3000;
let users = [];
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('static'));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"));
});
app.post("/zaloguj", function (req, res) {
    let wiadomosc = "";
    let status = "";
    if(users.includes(req.body.login)){
        wiadomosc = `Nie udało się dodać użytkonika ${req.body.login}, już taki istnieje!`;
        status = "failed";
    }
    else{
        if (users.length < 2) {
            users.push(req.body.login);
            wiadomosc = `USER_ADD<br>Udało się dodać użytkownika ${users[users.length - 1]}`;
            status = "success";
        }
        else {
            wiadomosc = "Blad, jest juz 2 uzytkownikow"
            status = "failed";
        }
    }
    let last = {
        wiadomosc: wiadomosc,
        id_gracza: users.length - 1,
        nazwa: users[users.length - 1],
        users: users,
        status:status
    }
    console.log(users);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(last, null, 5));
});
app.post("/reset", function (req, res) {
    users = [];
    let wiadomosc = "Wyczyszczono uzytkownikow";
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(wiadomosc, null, 5));
});
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})