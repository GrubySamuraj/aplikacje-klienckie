const fsPromises = require("fs").promises
const path = require("path")
const dirs = async () => {
    try {
       // uwaga można zastosować, for, for of ale nie for each       

        const data = await fsPromises.readdir(__dirname)
        console.log(data);
     
        for (let i = 0; i < data.length; i++) {
            const stat = await fsPromises.lstat(data[i])
            console.log(data[i], stat.isDirectory(), new Date().getMilliseconds());
        }
    } catch (error) {
        console.log(error);
    }

}

dirs()
