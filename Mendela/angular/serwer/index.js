const express = require('express');
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.text());
var parseString = require("xml2js").parseString;
let xml2js = require("xml2js");
var fs = require('fs');
let path = '../AtariNewspapers/src/assets/newsPapers.xml'
app.post('/add', (req, res) => {
    let data2 = JSON.parse(req.body);
    fs.readFile(path, function (err, data) {
        if (err) {
            throw err;
        }
        parseString(data, function (err, result) {
            if (err) console.log(err);
            let name = data2.name
            if (!result.czasopisma.zmienne[0][name]) {
                result.czasopisma.zmienne[0][name] = [{
                    src: [data2.name],
                    klik: [data2.file]
                }]
            }
            if (!result.czasopisma.lata[0][data2.name]) {
                result.czasopisma.lata[0][data2.name] = [];
                result.czasopisma.lata[0][data2.name][0] = "";
                for (let x = 0; x < data2.years.length; x++) {
                    if (x !== data2.years.length - 1) {
                        result.czasopisma.lata[0][data2.name][0] += `${data2.years[x]},`;
                    }
                    else {
                        result.czasopisma.lata[0][data2.name][0] += `${data2.years[x]}`;
                    }
                }
            }
            if (!result.czasopisma[data2.name]) {
                result.czasopisma[data2.name] = [];
            }
            let builder = new xml2js.Builder();
            let xml = builder.buildObject(result);
            fs.writeFile(path, xml, function (err, data) {
                if (err) throw err;
            })
        });
    });
    console.log(JSON.parse(req.body));
});
app.post('/edit', (req, res) => {
    let data2 = JSON.parse(req.body);
    fs.readFile("./newsPapers.xml", function (err, data) {
        if (err) {
            throw err;
        }
    });
    console.log(JSON.parse(req.body));
});
app.listen(port, () => {
    console.log(`App listening on port ${port} `)
})