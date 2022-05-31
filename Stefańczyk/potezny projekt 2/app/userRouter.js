const getRequestData = require("./getRequestData");
const tagsController = require("./tagsController");
const userController = require("./userController.js");
let { rawTags, convertedData } = require("./model");
const router = async (req, res) => {
    // 
    if (req.url == "/api/user/login" && req.method == "POST") {
        let data = await getRequestData.getData(req);
        let odp = await userController.login(data);
        if (odp === "Udało się zalogować!")
            res.writeHead(200, { "Content-type": "application/json" });
        else
            res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify(odp, null, 5));
    }
    // 
    else if (req.url === "/api/users" && req.method === "GET") {
        let ret = await userController.getAll();
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(ret, null, 5));
    }
    //
    else if (req.url === "/api/user" && req.method === "GET") {
        let auth = await userController.authentication(req);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(auth, null, 5));
    }
}
module.exports = router