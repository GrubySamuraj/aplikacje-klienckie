var express = require("express")
var app = express()
const PORT = 3000;
var path = require("path")
let sumakontrolna = 0;
let users = [
    { nick: "111", email: "111@w.pl" },
    { nick: "222", email: "222@w.pl" },
    { nick: "333", email: "333@w.pl" }
]
app.use(express.static('static')) // pliki strony


//nasłuch na określony port
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/adduser.html"))
});
app.get("/formularz", function (req, res) {
    let nick = req.query.nick
    let email = req.query.mail
    sumakontrolna = 0;
    for (let x = 0; x < users.length; x++) {
        if (users[x].email != email) {
            sumakontrolna++
        }
    }
    console.log(sumakontrolna)
    if (sumakontrolna == users.length) {
        users.push({ nick: nick, email: email })
    }
    else {
        res.send("Taki email już istnieje")
    }
    console.log(users);
})
app.get("/select", function (req, res) {
    console.log("");
    let form = `<form action="/select1" method="GET">
                    <select name="userzy">`
    for (let x = 0; x < users.length; x++) {
        form += `<option value=${users[x].email}>${users[x].email}</option>`
    }

    form += `</select>
                    <input type="submit" value="submit">
                </form>`
    res.send(form);
})
app.get("/select1", function (req, res) {
    let sumakontrolna1 = 0;
    let odp = req.query.userzy;
    for (let x = 0; x < users.length; x++) {
        if (users[x].email == odp) {
            users.splice(x, 1)
        }
    }
    console.log(users);
    res.redirect("/select")
})
app.get("/radio", function (req, res) {
    let form = `<form action="/radio1" method="GET">`
    for (let x = 0; x < users.length; x++) {
        form += `<input type="radio" name="users" value="${users[x].email}">
        <label for="">${users[x].email}</label>`
    }
    form += `</select>
                    <input type="submit" value="submit">
                </form>`
    console.log(users);
    res.send(form);
})
app.get("/radio1", function (req, res) {
    let odp = req.query.users;
    for (let x = 0; x < users.length; x++) {
        if (users[x].email == odp) {
            users.splice(x, 1)
        }
    }
    console.log(users);
    res.redirect("/radio")
})
app.get("/checkbox", function (req, res) {
    let form = `<form action="/checkbox1" method="GET">`
    for (let x = 0; x < users.length; x++) {
        form += `<input type="checkbox" name="user${x}" value="${users[x].email}">
        <label for="">${users[x].email}</label>`
    }
    form += `</select>
                    <input type="submit" value="submit">
                </form>`
    console.log(users);
    res.send(form);
})
app.get("/checkbox1", function (req, res) {
    let odp = 0;
    for (let x = 0; x < users.length; x++) {
        odp = req.query.user + x;
        if (users[x].email == odp) {
            users.splice(x, 1)
        }
    }
    console.log(users);
    res.redirect("/checkbox")
})
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})