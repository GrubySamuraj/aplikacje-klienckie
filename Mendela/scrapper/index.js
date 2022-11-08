const express = require("express");
const app = express()
const PORT = 3001;
app.use(express.json());
app.use(express.static('static'));
let info = [];
var path = require("path");
const cheerio = require('cheerio');
let linki2;
const axios = require("axios");
let odwiedzone = [];

app.post("/data", async function (req, res) {
    info = [];
    let data = await findMail(req.body.value, 3, []);
    res.send(JSON.stringify(data, 0, 5));
});

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
});

async function findMail(link, ile) {
    return promise = new Promise(async (resolve, reject) => {
        try {
            let maile = [];
            let linki = [];
            let status = "git";
            axios.get(link)
                .then(function (content) {
                    content = content.data
                    content = content.split("\n");
                    content.map((x) => {
                        if (x.match(/[a-z0-9._%+-]*@[a-z0-9.-]+(\.[a-z])/i)) {
                            let text = x.match(/[a-z0-9._%+-]*@[a-z0-9.-]+(\.[a-z])*/i)[0];
                            maile.push(text);
                        }
                        else if (x.match("(.*href?)")) {
                            let $ = cheerio.load(x);
                            let text = $("a").attr("href");
                            if (text != undefined) {
                                if (linki.length < 10) {
                                    //wyjsc z index.html jak sie konczy
                                    let newLink
                                    if (text.match(/^(\/[^\/]+){0,2}\/?$/gm) && text.match(/\.html$/gm)) { //naprawić regexa
                                        console.log(text);
                                        console.log(link);
                                        newLink = path.join(link, "../.", text);
                                    }
                                    else {
                                        newLink = path.join(link, text);
                                    }
                                    if (!odwiedzone.includes(newLink))
                                        linki.push(newLink);
                                }
                            }
                        }
                    });
                    let data = {
                        status: status,
                        link: link,
                        mails: maile,
                        podstrony: linki
                    }
                    if (ile > 0 && data.podstrony.length > 0) {
                        if (linki.length == 0) {
                            let isset = containsObject(data.link, info)
                            if (!isset) {
                                info.push(data);
                            }
                        }
                        else {
                            odwiedzone.push(link);
                            linki.map(async link => {
                                linki2 = linki;
                                let isset = containsObject(data.link, info)
                                if (!isset) {
                                    info.push(data);
                                }
                                resolve(await findMail(link, ile - 1));
                            });
                        }
                    }
                    else {
                        info.push(data);
                        resolve(info);
                    }
                })
                .catch(async function (err) {
                    console.log(err);
                    let id = linki2.indexOf(link);
                    console.log(id);
                    if (id < linki2.length && id > 0) {
                        resolve(await findMail(linki2[id + 1], ile - 1));
                    }
                    else {
                        console.log("koniec");
                        console.log(info);
                        resolve(info);
                    }
                });
        }
        catch (err) {
            console.log(err);
            reject(err);
        }
    });
}
function containsObject(obj, array) {
    for (let i = 0; i < array.length; i++) {
        // console.log(array[i]);
        if (array[i].link === obj) {
            return true;
        }
    }

    return false;
}
// request("https://www.google.com", function(error, response, body) {
//    if (!error && response.statusCode == 200) {
//      // writing the response to a file named data.html
//      fs.writeFileSync("data.html", body);
//    }
//  });