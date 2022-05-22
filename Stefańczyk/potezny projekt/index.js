const http = require('http');
const imageRouter = require("./app/imageRouter");
const tagsRouter = require("./app/tagsRouter");
const PORT = 3000;

http.createServer(async (req, res) => {

    if (req.url.search("/api/photos") != -1) {
        await imageRouter(req, res)
    }

    else if (req.url.search("/api/tags") != -1) {
        await tagsRouter(req, res)
    }

})
    .listen(PORT, () => console.log("listen on 3000"))