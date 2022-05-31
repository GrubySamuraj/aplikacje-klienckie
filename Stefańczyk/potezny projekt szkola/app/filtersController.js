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
                    console.log(filter);
                    let filename = file.url.split(".");
                    switch (filter.name) {
                        case "rotate":
                            await sharp(file.url)
                                .rotate(data.options[0].value)
                                .toFile(`${filename[0]}-${filter.name}.${filename[1]}`);
                            break;
                        case "resize":
                            await sharp(file.url)
                                .resize({
                                    width: data.options[0].value,
                                    height: data.options[1].value
                                })
                                .toFile(`${filename[0]}-${filter.name}.${filename[1]}`);
                            break;
                        case "reformat":
                            await sharp(file.url)
                                .toFormat(data.options[0].value)
                                .toFile(`${filename[0]}-${filter.name}.${data.options[0].value}`);
                            break;
                        case "extract":
                            await sharp(file.url)
                                .extract({ width: data.options[0].value, height: data.options[1].value, left: data.options[2].value, top: data.options[3].value })
                                .toFile(`${filename[0]}-${filter.name}.${filename[1]}`);
                            break;
                        case "grayscale":
                            await sharp(file.url)
                                .grayscale()
                                .toFile(`${filename[0]}-${filter.name}.${filename[1]}`);
                            break;
                        case "flip":
                            await sharp(file.url)
                                .flip()
                                .toFile(`${filename[0]}-${filter.name}.${filename[1]}`);
                            break;
                        case "negate":
                            await sharp(file.url)
                                .negate()
                                .toFile(`${filename[0]}-${filter.name}.${filename[1]}`);
                            break;
                        case "tint":
                            await sharp(file.url)
                                .tint({ r: data.options[0].value, g: data.options[1].value, b: data.options[2].value })
                                .toFile(`${filename[0]}-${filter.name}.${filename[1]}`);
                            break;
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