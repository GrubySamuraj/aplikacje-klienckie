const http = require('http');
const imageRouter = require("./app/imageRouter");
const tagsRouter = require("./app/tagsRouter");
const filtersRouter = require("./app/filtersRouter");
const usersRouter = require("./app/userRouter");
const logger = require('tracer').colorConsole();
require('dotenv').config();
const PORT = 3000;

http.createServer(async (req, res) => {

    if (req.url.search("/api/photos") != -1) {
        await imageRouter(req, res);
    }

    //tags router
    else if (req.url.search("/api/tags") != -1) {
        await tagsRouter(req, res);
    }

    //filters router
    else if (req.url.search("/api/filters") != -1) {
        await filtersRouter(req, res);
    }
    //czytanie plików
    else if (req.url.search("/uploads/") != -1) {
        let typ = req.url.split(".")[1];
        let img = await imageRouter(req, res);
        if (img) {
            res.writeHead(200, { 'Content-Type': 'image/' + typ });
            res.write(img);
            res.end();
        }
        else {
            logger.error("Nie ma zdjęcia");
            res.writeHead(404, { 'Content-Type': "text/html" });
            res.write("Not found");
            res.end();
        }
    }
    else if (req.url.search("/api/user") != -1) {
        await usersRouter(req, res)
    }
})
    .listen(process.env.APP_PORT, () => console.log("listen on 3000"))