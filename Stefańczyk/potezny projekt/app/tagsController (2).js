const fileController = require("./fileController");
let { photos, rawTags, convertedData } = require("./model");
const getRequestData = require("./getRequestData");
const logger = require('tracer').colorConsole();

module.exports = {
    getRaw: async () => {
        return new Promise((resolve, reject) => {
            try {
                console.log(rawTags);
                resolve(rawTags);
            }
            catch (err) {
                reject(err);
            }
        })
    },
    add: async (data) => {
        return new Promise((resolve, reject) => {
            try {
                rawTags.push(data.name);
                let obj = {
                    id: convertedData.length,
                    name: data.name,
                    popularity: data.popularity
                };
                convertedData.push(obj);
                logger.info("Dodano tag: " + data.name);
                resolve(`Dodano tag ${data.name}`);
            }
            catch (err) {
                reject(err);
            }
        })
    },
    getOne: async (id) => {
        return new Promise((resolve, reject) => {
            try {
                let found = ""
                for (let x = 0; x < convertedData.length; x++) {
                    if (convertedData[x].id == id) {
                        found = convertedData[x];
                    }
                }
                resolve(found);
            }
            catch (err) {
                reject(err);
            }
        })
    },
    addTagToPhoto: async (data, id) => {
        return new Promise((resolve, reject) => {
            try {
                let iletag = 0;
                let found;
                for (let x = 0; x < photos.length; x++) {
                    if (photos[x].id == id) {
                        found = photos[x];
                    }
                }
                if (found) {
                    for (let x = 0; x < found.tags.length; x++) {
                        if (found.tags[x].name == data.name) {
                            tag = found.tags[x];
                            iletag++;
                        }
                    }
                    if (iletag == 0) {
                        found.tags.push({
                            name: data.name,
                            popularity: data.popularity
                        });
                        logger.info("Dodano tag do zdjęcia");
                        resolve(found);
                    }
                    else if (iletag > 0) {
                        logger.warn("Nie dodano tagu do zdjęcia");
                        resolve("Już istnieje taki tag!");
                    }
                }
                else {
                    logger.error("Nie dodano tagu do zdjęcia");
                    resolve("Nie ma takiego zdjęcia!");
                }

            }
            catch (err) {
                reject(err);
                logger.error(err);
            }
        })
    },
    isTagSet: async (data) => {
        return new Promise((resolve, reject) => {
            try {
                if (rawTags.includes(data.name)) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }

            }
            catch (err) {
                reject(err);
            }
        })
    },
    getPhotoTag: async (id) => {
        return new Promise((resolve, reject) => {
            try {
                let ret;
                for (let x = 0; x < photos.length; x++) {
                    if (photos[x].id == id) {
                        ret = photos[x].tags;
                    }
                }
                if (!ret) {
                    ret = "Nie ma takiego zdjęcia w bazie!";
                }
                resolve({
                    id: id,
                    tags: ret
                });
            }
            catch (err) {
                reject(err);
            }
        })
    }
}