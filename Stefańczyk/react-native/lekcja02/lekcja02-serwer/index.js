const express = require("express")
const app = express()
app.use(express.json()); // należy pamiętać o nagłówku w fetch-u
app.use(express.static("static"));
const PORT = 3000;
let users = [];
app.post("/", function (req, res) {
    if ((users.filter(user => { return user.username === req.body.username })).length == 0) {
        let user = {
            username: req.body.username,
            password: req.body.password,
            status: "ok",
            registred: Date.now()
        }
        console.log(user);
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
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})