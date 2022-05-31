const tagsController = require("./tagsController");
const filtersController = require("./filtersController");
const getRequestData = require("./getRequestData");
let { rawTags, convertedData } = require("./model");
const jsonController = require("./jsonController");
const router = async (req, res) => {
    // pobranie wszystkich tagów bez konwersji na obiekty
    if (req.url == "/api/filters" && req.method == "GET") {
        let filters = await filtersController.getAll();
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(filters, null, 5));
    }
    else if (req.url.match(/\/api\/filters\/metadata\/([0-9]+)/) && req.method == "GET") {
        let id = req.url.split("/")[4];
        let zwrot = await filtersController.getMetaDataImage(id);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(zwrot, null, 5));
    }
    // pobranie wszystkich tagów z konwersją na obiekty
    else if (req.url == "/api/filters" && req.method == "PATCH") {
        let data = await getRequestData.getData(req);
        let status = await filtersController.remakePhoto(data);
        let odp = await jsonController.addHistory(status.id, status.status, status.url);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(odp, null, 5));
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