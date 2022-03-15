var express = require("express")
var app = express();
var path = require("path")
const PORT = 3000;
app.use(express.static('static'));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"));
});
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})