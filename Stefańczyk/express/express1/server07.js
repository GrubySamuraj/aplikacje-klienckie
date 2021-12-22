var express = require("express")
var cookieParser = require("cookie-parser")
var app = express()
app.use(cookieParser())
const PORT = 3000;

app.get('/', function (req, res) {
    res
        .cookie("cookieA", "aaa", { expires: new Date(Date.now() + 1000 * 60 * 60 * 4), httpOnly: true })
        .send('cookieA zostało ustawione')

    console.log("cookies :  ", req.cookies);

});

//nasłuch na określonym porcie

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})