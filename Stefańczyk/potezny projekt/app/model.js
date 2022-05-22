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
let convertedData = convertRaw(rawTags);
module.exports = { photos, rawTags, convertedData }