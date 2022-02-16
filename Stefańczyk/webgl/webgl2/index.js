var express = require("express")
var app = express();
var fs = require("fs");
app.use(express.static('static')) // serwuje stronę index.html

// export 'app'
module.exports = app