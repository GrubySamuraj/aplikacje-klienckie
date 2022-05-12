var express = require("express")
var app = express();
var path = require("path")
const PORT = 3000;
let users = [];
let wait = true;
let move;
let win = false;
let win_user;
let zbicieX = -1;
let zbicieY = -1;
let plansza = [
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0]
];
app.use(express.json());
app.use(express.static('static'));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"));
});
app.post("/zaloguj", function (req, res) {
    console.log(req.body);
    let status = "";
    let wiadomosc = "";
    if (users.includes(req.body.login)) {
        wiadomosc = `Użytkownik ${req.body.login} istnieje!`;
        status = "failed";
    }
    else {
        if (users.length < 2) {
            users.push(req.body.login);
            wiadomosc = `USER_ADD<br>Udało się dodać użytkownika ${users[users.length - 1]}`;
            status = "success";
        }
        else {
            wiadomosc = "Blad, jest juz 2 uzytkownikow";
            status = "failed";
        }
    }
    let last = {
        wiadomosc: wiadomosc,
        id_gracza: users.length - 1,
        nazwa: users[users.length - 1],
        users: users,
        status: status
    };
    console.log("ilosc userow: " + users.length);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(last, null, 5));
});
app.post("/reset", function (req, res) {
    users = [];
    let wiadomosc = "Wyczyszczono uzytkownikow";
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(wiadomosc, null, 5));
});
app.post("/wait", function (req, res) {
    let przeciwnik;
    for (let x = 0; x < users.length; x++) {
        if (users[x] != req.body.id) {
            przeciwnik = users[x];
        }
    }
    if (users.length == 2) {
        wait = false
    }
    console.log("user: ", req.body.id);
    console.log("przeciwnik: ", przeciwnik);
    let odp = { wait: wait, przeciwnik: przeciwnik };
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(odp, null, 5));
});
app.post("/move", function (req, res) {
    let odp = req.body;
    console.log(req.body);
    plansza = req.body.plansza;
    zbicieX = req.body.zbicieX;
    zbicieY = req.body.zbicieY;
    move = req.body;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(odp, null, 5));
});
app.post("/wait_move", function (req, res) {
    console.log(req.body.plansza);
    if (!move) {
        move = {
            plansza: plansza,
            zbicieX: zbicieX,
            zbicieY: zbicieY,
            win: win,
            win_user: win_user
        };
    }
    zbicieX = -1;
    zbicieY = -1;
    move.win = win;
    odp = move;
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(odp, null, 5));
    if (win == true) {
        win = false;
    }
});
app.post("/win", function (req, res) {
    //wywoluje mi sie ta funkcja
    win_user = req.body.log;
    win = true;
});
app.post("/winWait", function (req, res) {
    let odp = {
        win: win,
        win_user: win_user
    }
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(odp, null, 5));
});
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
});