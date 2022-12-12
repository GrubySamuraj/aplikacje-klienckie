const express = require('express');
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cheerio = require('cheerio');
app.use(bodyParser.text());
var fs = require('fs');

app.post('/add', (req, res) => {
    let data2 = JSON.parse(req.body);
    fs.readFile('../AtariNewspapers/src/assets/newsPapers.xml', function (err, data) {
        if (err) {
            throw err;
        }
        const $ = cheerio.load(`${data.toString()}`);
        $('zmienne').append(`<${data2.name}><src>${data2.file}</src><klik>${data2.name}</klik></${data2.name}>`);
        $('lata').append(`<${data2.name}>`)
        for (let x = 0; x < data2.years.length; x++) {
            $(`${data2.name}`).append(`${data2.years[x]}</${data2.name}> `);
        }
        $('lata').append(`</${data2.name}>`)
        console.log($('zmienne').html());
        console.log($('lata').html());
    });
    //output to file
    console.log(JSON.parse(req.body));
});
app.post('/edit', (req, res) => {
    let data2 = JSON.parse(req.body);
    fs.readFile('../AtariNewspapers/src/assets/newsPapers.xml', function (err, data) {
        if (err) {
            throw err;
        }
        const $ = cheerio.load(`${data.toString()}`);
    });
    //output to file
    console.log(JSON.parse(req.body));
});
app.listen(port, () => {
    console.log(`App listening on port ${port} `)
})