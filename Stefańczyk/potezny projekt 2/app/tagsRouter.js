const getRequestData = require("./getRequestData");
const tagsController = require("./tagsController");
let { rawTags, convertedData } = require("./model");
const router = async (req, res) => {
    // pobranie wszystkich tagów bez konwersji na obiekty
    if (req.url == "/api/tags/raw" && req.method == "GET") {
        let raw = await tagsController.getRaw();
        console.log(raw);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(raw, null, 5));
    }
    // pobranie wszystkich tagów z konwersją na obiekty
    else if (req.url == "/api/tags" && req.method == "GET") {
        let converted = convertedData;
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(converted, null, 5));
    }
    // pobranie jednego taga
    else if (req.url.match(/\/api\/tags\/([0-9]+)/) && req.method == "GET") {
        let id = req.url.split("/")[3];
        console.log(id);
        let zwrot = await tagsController.getOne(id);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(zwrot, null, 5));
    }
    // utworzenie nowego taga
    else if (req.url == "/api/tags" && req.method == "POST") {
        let data = await getRequestData.getData(req);
        let ret = await tagsController.add(data);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(ret, null, 5));
    }
}
module.exports = router