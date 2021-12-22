var express = require("express")
var app = express()
const PORT = 3000;

// app.use(express.static('static')) // pliki strony

let uczniowe = [
    { dane: "1Nazwisko Imie" },
    { dane: "2Nazwisko Imie" },
    { dane: "3Nazwisko Imie" },
    { dane: "4Nazwisko Imie" },
    { dane: "5Nazwisko Imie" },
    { dane: "6Nazwisko Imie" }
]
names = ["obecny", "nieobecny", "spozniony"]
//nasłuch na określony port
app.get('/', function (req, res) {
    let form = `<form action="/radio1" method="GET">`
    for (let x = 0; x < uczniowe.length; x++) {
        form += `<label for="">${uczniowe[x].dane}</label>`
        for (let y = 0; y < 3; y++) {
            form += `<input type="radio" name="obecnosc${x}" value="${names[y]}">`
        }
    }
    form += `</select>`
    form += ` <input type="submit" value="submit">
                </form> `
    console.log(uczniowe);
    res.send(form);
});
app.get('/radio1', function (req, res) {
    let radio = req.query
    console.log("query: ", radio);

})
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
    console.log("Witaj");
})
