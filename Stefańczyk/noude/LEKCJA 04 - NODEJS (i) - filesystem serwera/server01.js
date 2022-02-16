const fs = require("fs");
const path = require("path");
const filepath = path.join(__dirname, "files", "file01.txt")
fs.readFile("./files/file01.txt", "utf-8",  (err, data)=> {
    if (err) throw err
    console.log(data.toString());
})
const filepath2 = path.join(__dirname, "files", "file02.txt")

fs.writeFile(filepath2, "cos",  (err)=> {
    if (err) throw err
    console.log("plik nadpisany");
})
fs.appendFile(filepath2, "\n\ntekst do dopisania",  (err) =>{
    if (err) throw err
    console.log("plik utworzony");
})
fs.unlink(filepath2,  (err) =>{
    if (err) throw err
    console.log("czas 1: " + new Date().getMilliseconds());
})
if (fs.existsSync(filepath)) {
    console.log("plik istnieje");
} else {
    console.log("plik nie istnieje");
}
const filepath3 = path.join(__dirname, "files", "file03.txt")
const filepath4 = path.join(__dirname, "files", "file04.txt")

fs.writeFile(filepath3, "tekst do zapisania", (err) => {
    if (err) throw err
    console.log("plik utworzony - czas 1: " + new Date().getMilliseconds());

})