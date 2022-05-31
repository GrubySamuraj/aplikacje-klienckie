const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const logger = require('tracer').colorConsole();
const jsonController = require("./jsonController");
let myUploadDir = "uploads/";
module.exports = {
    add: async (req) => {
        return new Promise((resolve, reject) => {
            try {
                const form = formidable({});
                form.uploadDir = myUploadDir;
                form.keepExtensions = true;
                form.parse(req, function (err, fields, files) {
                    let filename = files.file.path.split("\\")[1];
                    let beforePath = files.file.path;
                    let afterPath = path.join(myUploadDir, fields.album, filename);
                    if (!fs.existsSync(myUploadDir + "/" + fields.album)) {
                        fs.mkdir(myUploadDir + "/" + fields.album, () => {
                            fs.rename(beforePath, afterPath, () => {
                                logger.info('File uploaded');
                            })
                        })
                    }
                    else {
                        fs.rename(beforePath, afterPath, () => {
                            logger.info('File uploaded');
                        })
                    }
                    resolve({
                        fields: fields,
                        files: files.file,
                        afterPath: afterPath
                    })
                });
            }
            catch (err) {
                reject(err);
            }
        })
    },
    delete: async (id) => {
        return new Promise((resolve, reject) => {
            try {
                let info = jsonController.delete(id);
                console.log(info);
                console.log(info.url);
                if (fs.existsSync(info.url)) {
                    fs.unlink(info.url, () => {
                        logger.warn(`File ${info.id} deleted`);
                    })
                    resolve(`Usunięto plik o id: ${info.id}`);
                }
                else {
                    logger.warn(`File doesn't exist`);
                    resolve(`Taki plik nie istnieje!`);
                }
            }
            catch (err) {
                reject(err);
            }
        })
    },
}