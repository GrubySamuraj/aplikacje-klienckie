const express = require('express');
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.text());
var parseString = require("xml2js").parseString;
let xml2js = require("xml2js");
var fs = require('fs');
// let path = '../AtariNewspapers/src/assets/newsPapers_copy.xml'
let path = './newCopy.xml';
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
    fs.readFile("./newsPapers.xml", function (err2, data) {
        if (err2) {
            throw err2;
        }
        parseString(data, function (err, result) {
            if (err) {
                throw err
            }
            //remove
            let newData = [{}]
            for (let x = 0; x < data2.data.length; x++) {
                if (data2.data[x].newName === '') {
                    console.log("siup");
                    console.log(result.czasopisma[data2.name][0]);
                    newData[0][data2.data[x].nazwa] = result.czasopisma[data2.name][0][data2.data[x].nazwa];
                    newData[0][data2.data[x].nazwa][0].lata = data2.data[x].lata;
                    newData[0][data2.data[x].nazwa][0].miniaturka = data2.data[x].miniaturka;
                }
                else {
                    newData[0][data2.data[x].newName] = result.czasopisma[data2.name][0][data2.data[x].nazwa];
                    newData[0][data2.data[x].newName][0].lata = data2.data[x].lata;
                    newData[0][data2.data[x].newName][0].miniaturka = data2.data[x].miniaturka;
                }
                // newData[x].lata = data2.data[x].lata;
                // newData[x].miniaturka = data2.data[x].miniaturka;
            }
            console.log("newData: ");
            console.log(newData[0]['Atari_Age_1982_04222']);
            result.czasopisma[data2.name] = newData;
            let builder = new xml2js.Builder();
            let xml = builder.buildObject(result);
            fs.writeFile(path, xml, function (err, data) {
                if (err) throw err;
            })
        });
    });
    console.log(JSON.parse(req.body));
});
app.listen(port, () => {
    console.log(`App listening on port ${port} `)
})