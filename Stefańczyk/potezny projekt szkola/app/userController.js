const fileController = require("./fileController");
const userController = require("./userController.js");
let { users, tokens } = require("./model");
const logger = require('tracer').colorConsole();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
require('dotenv').config();
const config = {
    service: 'Yahoo',
    auth: {
        user: process.env.YAHOO_LOGIN,
        pass: process.env.YAHOO_PASS
    }
}
encryptPass = async (password) => {
    let encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
}
decryptPass = async (userpass, encrypted) => {
    let decrypted = await bcrypt.compare(userpass, encrypted)
    console.log(decrypted);
    return decrypted;
}
createToken = async (email) => {
    let token = await jwt.sign(
        {
            email: email
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "1h"
        }
    );
    console.log({ token: token });
    return token;
}
const verifyToken = async (token) => {
    try {
        let decoded = await jwt.verify(token, process.env.SECRET_KEY)
        console.log({ decoded: decoded });
        return decoded;
    }
    catch (ex) {
        console.log({ message: ex.message });
        return ex.message;
    }
}
module.exports = {
    register: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(data);
                if (data.name && data.lastName && data.email && data.password) {
                    const transporter = nodemailer.createTransport(config);
                    let password = await encryptPass(data.password);
                    console.log(password);
                    let token = await createToken(data.email);
                    let link = "http://localhost:3000/api/user/confirm/" + token;
                    console.log(link);
                    let user = {
                        id: users.length,
                        name: data.name,
                        lastName: data.lastName,
                        email: data.email,
                        password: password,
                        confirmed: false
                    }
                    transporter.sendMail({
                        from: config.auth.user,
                        to: data.email,
                        subject: "Potwierdzenie konta w serwisie Insta",
                        text: "text",
                        html: `<b>Witaj w naszym systemie, brakuje tylko potwierdzenia twojego konta w tym linku: <a href=${link}>tutaj</a>. Link jest ważny przez 1h.</b>`
                    });
                    users.push(user);
                    resolve("email sent on " + data.email);
                }
                else {
                    logger.error("Name, lastName, email lub password nie zostały podane!")
                    resolve("Something went wrong");
                }
            }
            catch (err) {
                logger.error(err);
                reject(err);
            }
        })
    },
    confirmUser: async (token) => {
        return new Promise(async (resolve, reject) => {
            try {
                let decodedToken = await verifyToken(token);
                let user;
                if (decodedToken !== 'jwt expired') {
                    for (let x = 0; x < users.length; x++) {
                        console.log(users[x]);
                        if (users[x].email == decodedToken.email) {
                            console.log(users[x]);
                            user = users[x].email;
                            users[x].confirmed = true;
                        }
                    }
                    if (!user) {
                        logger.error("User doesn't exist!");
                        resolve("User doesn't exist");
                    }
                    else {
                        const transporter = nodemailer.createTransport(config);
                        logger.info("Potwierdzono usera");
                        transporter.sendMail({
                            from: config.auth.user,
                            to: user,
                            subject: "Potwierdzenie konta w serwisie Insta - Powodzenie",
                            text: "text",
                            html: `<b>Potwierdzono konto w naszym serwisie!</b>`
                        });
                        resolve("potwierdzono");
                    }
                }
                else {
                    const transporter = nodemailer.createTransport(config);
                    transporter.sendMail({
                        from: config.auth.user,
                        to: user,
                        subject: "Potwierdzenie konta w serwisie Insta - Niepowodzenie",
                        text: "text",
                        html: `<b>Niestety token wygasł - proszę się zarejestrować jeszcze raz</b>`
                    });
                    resolve("Token wygasł");
                }
            }
            catch (err) {
                logger.error(err);
                reject(err);
            }
        })
    },
    login: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let foundUser;
                let odp;
                let token;
                for (let x = 0; x < users.length; x++) {
                    if (data.email == users[x].email) {
                        foundUser = users[x];
                        break;
                    }
                }
                if (foundUser) {
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
                else {
                    odp = { odp: "Nie ma takiego usera w bazie", token: token };
                    resolve(odp);
                }
            }
            catch (err) {
                logger.error(err);
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
                logger.error(err);
                reject(err);
            }
        })
    },
    authentication: async (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
                    let token = req.headers.authorization.split(" ")[1]
                    try {
                        let decoded = await jwt.verify(token, process.env.SECRET_KEY);
                        resolve({ verified: true, decoded: decoded });
                    }
                    catch (ex) {
                        console.log({ message: ex.message });
                        resolve({ verified: false, err: ex });
                    }
                }
                else {
                    console.log("Invalid token");
                    resolve({ verified: false });
                }
            }
            catch (err) {
                logger.error(err);
                reject(err);
            }
        })
    },
    changeData(email, data) {
        return new Promise(async (resolve, reject) => {
            try {
                let found;
                let odp;
                for (let x = 0; x < users.length; x++) {
                    if (email == users[x].email) {
                        found = users[x];
                    }
                }
                if (found) {
                    found.email = data.email;
                    resolve("Udało się zmienić dane!");
                }
                else {
                    resolve("Taki user nie istnieje!");
                }

            }
            catch (ex) {
                logger.error(err);
                reject(err);
            }
        })
    },
    updateUserProfilePicture(url, email) {
        return new Promise(async (resolve, reject) => {
            try {
                let found;
                let odp;
                for (let x = 0; x < users.length; x++) {
                    if (email == users[x].email) {
                        found = users[x];
                    }
                }
                if (found) {
                    found.ProfilePicture = url;
                    console.log(found);
                    resolve("Udało się zaktualizować zdjęcie profilowe!");
                }
                else {
                    resolve("Taki user nie istnieje!");
                }

            }
            catch (ex) {
                logger.error(err);
                reject(err);
            }
        })
    }
}