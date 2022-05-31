module.exports = {
    getData: async (req) => {
        return new Promise((resolve, reject) => {
            try {
                let body = "";
                req.on("data", function (data) {
                    body = data.toString();
                });
                req.on("end", function () {
                    body = JSON.parse(body);
                    resolve(body);
                })
            }
            catch (err) {
                reject(err);
            }
        })
    }
}