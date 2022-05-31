let { photos } = require("./model");
const fileController = require("./fileController");
const jsonController = require("./jsonController");
const tagsController = require("./tagsController");
const getRequestData = require("./getRequestData");
const fs = require("fs");
const path = require("path");

const router = async (req, res) => {
    if (req.url == "/api/photos" && req.method == "GET") {
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(jsonController.getAll(), null, 5));
    }
    else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "GET") {
        let id = req.url.split("/")[3];
        let zwrot = jsonController.getOne(id);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(zwrot, null, 5));
    }
    else if (req.url == "/api/photos" && req.method == "POST") {
        let msg = await fileController.add(req);
        let ret = await jsonController.add(msg.fields, msg.files, msg.afterPath);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(ret, null, 5));
    }
    else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "DELETE") {
        let id = req.url.split("/")[3];
        let zwrot = await fileController.delete(id);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(zwrot, null, 5));
    }
    else if (req.url == "/api/photos" && req.method == "PATCH") {
        let data = await getRequestData.getData(req);
        let msg = jsonController.update(data);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(msg, null, 5));
    }
    // aktualizacja danych zdjęcia o nowy tag
    else if (req.url == "/api/photos/tags" && req.method == "PATCH") {
        let data = await getRequestData.getData(req);
        let istag = await tagsController.isTagSet(data);
        let msg;
        console.log(data.id);
        if (istag) {
            msg = await tagsController.addTagToPhoto(data, data.id);
        }
        else {
            await tagsController.add(data);
            msg = await tagsController.addTagToPhoto(data, data.id);
        }
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(msg, null, 5));
    }
    // aktualizacja danych zdjęcia o tablicę nowych tag-ów
    else if (req.url == "/api/photos/tags/mass" && req.method == "PATCH") {
        let data = await getRequestData.getData(req);
        let msg = [];
        for (let x = 0; x < data.tags.length; x++) {
            let istag = await tagsController.isTagSet(data);
            console.log(data.id);
            if (istag) {
                msg = await tagsController.addTagToPhoto(data.tags[x], data.id);
            }
            else {
                await tagsController.add(data.tags[x]);
                msg = await tagsController.addTagToPhoto(data.tags[x], data.id);
            }
        }
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(msg, null, 5));
    }
    // pobranie tagów danego zdjęcia
    else if (req.url.match(/\/api\/photos\/tags\/([0-9]+)/) && req.method == "GET") {
        let id = req.url.split("/")[4];
        let msg = await tagsController.getPhotoTag(id);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(msg, null, 5));
    }
    else if (req.url.match(/\/uploads\/.*/) && req.method == "GET") {
        return new Promise((resolve, reject) => {
            try {
                console.log(req.url);
                fs.readFile("./" + req.url, function (error, data) {
                    resolve(data);
                })
            }
            catch (err) {
                reject(err)
            }
        })
    }
}
module.exports = router