const fileController = require("./fileController");
let { photos, rawTags, convertedData, users } = require("./model");
const getRequestData = require("./getRequestData");
const logger = require('tracer').colorConsole();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = {
    login: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let foundUser;
                let odp;
                let token
                for (let x = 0; x < users.length; x++) {
                    if (data.email == users[x].email) {
                        foundUser = users[x];
                        break;
                    }
                }
                let decrypted = await bcrypt.compare(data.password, foundUser.password);
                if (decrypted) {
                    token = await jwt.sign(
                        {
                            email: foundUser.email,
                            lastname: foundUser.lastName,
                            name: foundUser.name
                        },
                        process.env.SECRET_KEY, // powinno być w .env
                        {
                            expiresIn: "30m" // "1m", "1d", "24h"
                        }
                    );
                    odp = { token: token, odp: "Udało się zalogować!" };
                }
                else {
                    odp = { odp: "Błędnie hasło!", token: token }
                }
                resolve(odp);
            }
            catch (err) {
                reject(err);
            }
        })
    },
    getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(users);
            }
            catch (err) {
                reject(err);
            }
        })
    },
    authentication: async (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(req.headers.authorization);
                if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
                    // czytam dane z nagłowka
                    let token = req.headers.authorization.split(" ")[1]
                    try {
                        let decoded = await jwt.verify(token, process.env.SECRET_KEY)
                        resolve(decoded);
                    }
                    catch (ex) {
                        console.log({ message: ex.message });
                        resolve(ex);
                    }

                }
            }
            catch (err) {
                reject(err);
            }
        })
    }
}