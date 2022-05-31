let { photos } = require("./model");
const fileController = require("./fileController");
const jsonController = require("./jsonController");

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
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(msg, null, 5));
    }
    else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "DELETE") {
        let id = req.url.split("/")[3];
        let zwrot = await fileController.delete(id);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(zwrot, null, 5));
    }
    else if (req.url == "/api/photos" && req.method == "PATCH") {
        console.log(req.body);
        let msg = "";
        // let msg = jsonController(id);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(msg, null, 5));
    }
}
module.exports = router