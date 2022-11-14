const express = require("express")
const app = express()
app.use(express.json()); // należy pamiętać o nagłówku w fetch-u
app.use(express.static("static"));
const PORT = 3000;
let users = [];
let id = 0;
app.post("/", function (req, res) {
    console.log("aaaa");
    if ((users.filter(user => { return user.username === req.body.username })).length == 0) {
        let user = {
            id: id,
            username: req.body.username,
            password: req.body.password,
            status: "ok",
            registred: Date.now()
        }
        console.log(user);
        id++;
        users.push(user);
        res.send(users);
    }
    else {
        console.log("user exist");
        res.send({
            status: "error",
            message: "User exist"
        });
    }
})
app.post("/delete", function (req, res) {
    console.log(req.body);
    let a = users.filter(user => {
        return user.id === req.body.id
    })[0];
    users.splice(users.indexOf(a), 1);
    console.log(users);
    res.send(users);
});
app.post("/details", function (req, res) {
    let a = users.filter(user => {
        return user.id === req.body.id
    })[0];
    console.log(a);
    console.log(users[users.indexOf(a)]);
    res.send(users[users.indexOf(a)]);
});
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})