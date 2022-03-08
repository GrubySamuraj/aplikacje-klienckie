const fs = require("fs")
const path = require("path")
const filepath = path.join(__dirname, "node_modules")
if (!fs.existsSync("./newdir")) {
    fs.mkdir("./newdir", (err) => {
        if (err) throw err
        console.log("jest");
        if (fs.existsSync("./newdir")) {
            fs.rmdir("./newdir", (err) => {
                if (err) throw err
                console.log("nie ma ");
            })
        }
    })
}
fs.readdir(filepath, (err, files) => {
    if (err) throw err
    files.forEach((file) => {
        const filepath2 = path.join(filepath, file)
        fs.lstat(filepath2, (err, stats) => {
            console.log(file, stats.isDirectory());
        })
    })
})


