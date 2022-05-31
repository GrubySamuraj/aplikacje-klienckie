const fileController = require("./fileController");
let { photos } = require("./model");
const getRequestData = require("./getRequestData");
module.exports = {
    add: async (fields, file, url) => {
        return new Promise((resolve, reject) => {
            try {
                let timestamp = new Date();
                let id = Date.now()
                let obj = {
                    id: id,
                    album: fields.album,
                    originalName: file.name,
                    url: url,
                    lastChange: "original",
                    history: [
                        {
                            status: "original",
                            timestamp: timestamp
                        }
                    ],
                    tags: []
                }
                photos.push(obj);
                console.log(photos);
                resolve(obj);
            }
            catch (err) {
                reject(err);
            }
        })
    },
    getOne: (id) => {
        let found = ""
        for (let x = 0; x < photos.length; x++) {
            console.log(photos[x]);
            if (photos[x].id == id) {
                found = photos[x];
            }
        }
        return found;
    },
    delete: (id) => {
        let url;
        for (let x = 0; x < photos.length; x++) {
            if (photos[x].id == id) {
                console.log(photos[x]);
                url = photos[x].url;
                photos.splice(x, 1);
            }
        }
        return (
            {
                url: url,
                id: id
            }
        );
    },
    update: (data) => {
        console.log(data);
        let msg;
        let ilosc = 0;
        let pht;
        for (let x = 0; x < photos.length; x++) {
            if (photos[x].id == data.id) {
                pht = photos[x];
                ilosc++;
                let cos = {
                    status: data.status,
                    timestap: data.timestamp
                }
                photos[x].history.push(cos);
            }
        }
        if (ilosc == 0) {
            msg = "Nie istnieje taki plik!"
        }
        else {
            msg = pht;
        }
        return msg;
    },
    addHistory: async (id, status, url) => {
        return new Promise((resolve, reject) => {
            try {
                let odp;
                for (let x = 0; x < photos.length; x++) {
                    if (photos[x].id == id) {
                        photos[x].lastChange = status;
                        photos[x].history.push({
                            status: status,
                            timestamp: new Date(),
                            url: url
                        });
                        odp = photos[x]
                    }
                }
                resolve(odp);
            }
            catch (err) {
                reject(err);
            }
        })
    },
    getAll: () => {
        return photos;
    }
}