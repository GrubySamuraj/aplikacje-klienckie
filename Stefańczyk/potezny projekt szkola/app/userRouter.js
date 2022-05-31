let { photos } = require("./model");
const getRequestData = require("./getRequestData");
const fileController = require("./fileController");
const jsonController = require("./jsonController");
const userController = require("./userController");

const router = async (req, res) => {
    if (req.url == "/api/user/register" && req.method == "POST") {
        console.log("cos");
        let data = await getRequestData.getData(req);
        let odp = await userController.register(data);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(odp, null, 5));
    }
    else if (req.url.match(/\/api\/user\/confirm\/.*/) && req.method == "GET") {
        let token = req.url.split("/")[4];
        console.log(token);
        let zwrot = await userController.confirmUser(token);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(zwrot, null, 5));
    }
    else if (req.url == "/api/user/login" && req.method == "POST") {
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
        if (auth.verified) {
            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(auth.decoded, null, 5));
        }
        else {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify(auth, null, 5));
        }
    }
    else if (req.url === "/api/user" && req.method === "PATCH") {
        let auth = await userController.authentication(req);
        let data = await getRequestData.getData(req);
        if (auth.verified) {
            let odp = await userController.changeData(auth.decoded.email, data);
            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(odp, null, 5));
        }
        else {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify(auth, null, 5));
        }
    }
    else if (req.url === "/api/user/profile" && req.method === "POST") {
        let auth = await userController.authentication(req);
        console.log(auth.verified);
        if (auth.verified) {
            let msg = await fileController.addProfilePicture(req);
            let cos = await jsonController.add(msg.fields, msg.files, msg.afterPath);
            let odp = await userController.updateUserProfilePicture(msg.afterPath, auth.decoded.email);
            console.log(odp);
            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(odp, null, 5));
        }
        else {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify(auth, null, 5));
        }
    }
    else if (req.url === "/api/user/logout" && req.method === "GET") {
        let auth = await userController.authentication(req);
        if (auth.verified) {
            let odp = await userController.logout(auth.decoded.email);
            console.log(odp);
            res.writeHead(200, { "Content-type": "application/json" });
            res.end(JSON.stringify(odp, null, 5));
        }
        else {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify(auth, null, 5));
        }
    }
}
module.exports = router