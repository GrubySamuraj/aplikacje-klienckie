let { filterList, photos } = require("./model");
const logger = require('tracer').colorConsole();
const sharp = require("sharp");
module.exports = {
    getAll: async () => {
        return new Promise((resolve, reject) => {
            try {
                console.log(filterList);
                resolve(filterList);
            }
            catch (err) {
                reject(err);
            }
        });
    },
    getMetaDataImage: async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let file;
                for (let x = 0; x < photos.length; x++) {
                    if (photos[x].id == id) {
                        file = photos[x].url
                    }
                }
                if (file) {
                    let meta = await sharp(file)
                        .metadata()
                    resolve(meta)
                }
                else {
                    resolve("url_not_found")
                }

            } catch (err) {
                reject(err.mesage)
            }
        })
    },
    remakePhoto: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let file;
                let filter;
                if (data.id_obrazka) {
                    for (let x = 0; x < photos.length; x++) {
                        if (photos[x].id == data.id_obrazka) {
                            file = photos[x];
                        }
                    }
                }
                if (data.id) {
                    for (let y = 0; y < filterList.length; y++) {
                        if (data.id == filterList[y].id) {
                            filter = filterList[y];
                        }
                    }
                }
                if (file) {
                    let filename = file.url.split(".");
                    if (data.options.length == 1) {
                        let meta = await sharp(file.url)
                        [`${filter.name}`](data.options[0].value)
                            .toFile(`${filename[0]}-${filter.name}.${filename[1]}`);
                        resolve({
                            id: file.id,
                            status: filter.name,
                            url: `${filename[0]}-${filter.name}.${filename[1]}`
                        });
                    }
                    else if (data.options.length == 0) {
                        let meta = await sharp(file.url)
                        [`${filter.name}`]()
                            .toFile(`${filename[0]}-${filter.name}.${filename[1]}`);
                        resolve({
                            id: file.id,
                            status: filter.name,
                            url: `${filename[0]}-${filter.name}.${filename[1]}`
                        });
                    }
                    else if (data.options.length == 2) {
                        let meta = await sharp(file.url)
                        [`${filter.name}`](data.options[0].value, data.options[1].value)
                            .toFile(`${filename[0]} -${filter.name}.${filename[1]} `);
                        resolve({
                            id: file.id,
                            status: filter.name,
                            url: `${filename[0]}-${filter.name}.${filename[1]}`
                        });
                    }
                    else if (data.options.length == 3) {
                        let meta = await sharp(file.url)
                        [`${filter.name}`](data.options[0].value, data.options[1].value, data.options[2].value)
                            .toFile(`${filename[0]} -${filter.name}.${filename[1]} `);
                        resolve({
                            id: file.id,
                            status: filter.name,
                            url: `${filename[0]}-${filter.name}.${filename[1]}`
                        });
                    }
                    else if (data.options.length == 4) {
                        let meta = await sharp(file.url)
                        [`${filter.name}`](data.options[0].value, data.options[1].value, data.options[2].value, data.options[3].value)
                            .toFile(`${filename[0]} -${filter.name}.${filename[1]} `);
                        resolve({
                            id: file.id,
                            status: filter.name,
                            url: `${filename[0]}-${filter.name}.${filename[1]}`
                        });
                    }
                    else if (data.options.length == 5) {
                        let meta = await sharp(file.url)
                        [`${filter.name}`](data.options[0].value, data.options[1].value, data.options[2].value, data.options[3].value, data.options[4].value)
                            .toFile(`${filename[0]} -${filter.name}.${filename[1]} `);
                        resolve({
                            id: file.id,
                            status: filter.name,
                            url: `${filename[0]}-${filter.name}.${filename[1]}`
                        });
                    }
                }
                else {
                    resolve("url_not_found")
                }

            } catch (err) {
                reject(err.mesage)
            }
        })
    }
}