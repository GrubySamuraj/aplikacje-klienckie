function convertRaw(rawData) {
    let convertedData = [];
    for (let x = 0; x < rawData.length; x++) {
        let popularity = Math.floor(Math.random() * 1000);
        let obj = {
            "id": x,
            "name": rawData[x],
            "popularity": popularity
        }
        convertedData.push(obj);
    }
    return convertedData;
}
photos = [
];
rawTags = [
    "#love",
    "#instagood",
    "#fashion",
    "#photooftheday",
    "#beautiful",
    "#art",
    "#photography",
    "#happy",
    "#picoftheday",
    "#cute",
    "#follow",
    "#tbt",
    "#followme",
    "#nature",
    "#like4like",
    "#travel",
    "#instagram",
    "#style",
    "#repost",
    "#summer",
    "#instadaily",
    "#selfie",
    "#me",
    "#friends",
    "#fitness",
    "#girl",
    "#food",
    "#fun",
    "#beauty",
    "#instalike",
    "#smile",
    "#family",
    "#photo",
    "#life",
    "#likeforlike",
    "#music",
    "#follow4follow",
    "#makeup",
    "#amazing",
    "#igers",
    "#nofilter",
    "#dog",
    "#model",
    "#sunset",
    "#beach",
    "#instamood",
    "#motivation"
];
let filterList = [
    {
        "id": 1,
        "name": "metadata",
        "description": "dostępne informacje o zdjęciu",
        "method": "get",
        "args": "bez argumentów"
    },
    {
        "id": 2,
        "name": "rotate",
        "description": "obrót w stopniach w prawo, ujemna wartość w lewo",
        "method": "patch",
        "args": "id obrazka, wartość x = 0-360"
    },
    {
        "id": 3,
        "name": "resize",
        "description": "obrót w stopniach w prawo, ujemna wartość w lewo",
        "method": "patch",
        "args": "id obrazka, w, h"
    },
    {
        "id": 4,
        "name": "reformat",
        "description": "Zmiana formatu z jednego na inny",
        "method": "patch",
        "args": "id obrazka, na jaki inny format"
    },
    {
        "id": 5,
        "name": "extract",
        "description": "Przycięcie części obrazka",
        "method": "patch",
        "args": "id obrazka, w, h, left, top"
    },
    {
        "id": 6,
        "name": "grayscale",
        "description": "Zmiana na odcinen szarości",
        "method": "patch",
        "args": "id obrazka"
    },
    {
        "id": 7,
        "name": "flip",
        "description": "Obrót obrazka",
        "method": "patch",
        "args": "id obrazka"
    },
    {
        "id": 8,
        "name": "negate",
        "description": "Negacja kolorów",
        "method": "patch",
        "args": "id obrazka"
    },
    {
        "id": 9,
        "name": "tint",
        "description": "Zmiana kolorów obrazka",
        "method": "patch",
        "args": "id obrazka,r,g,b"
    },
];
let users = [
    {
        "id": 12345,
        "name": "firstName",
        "lastName": "lastName",
        "email": "name@email2.pl",
        "confirmed": true,
        "password": "$2a$10$YVQdbFFsI8jTxgueB8QY6OqSlc7tdJJ5ZtQ2hKRiNf.4y2tee2V6O",
        "ProfilePicture": "",
        "Pictures": []
    }
];
let tokens = [];
let convertedData = convertRaw(rawTags);
module.exports = { photos, rawTags, convertedData, filterList, users, tokens }