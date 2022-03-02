export default async (req) => {
    const promise = new Promise((resolve, reject) => {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", async () => {
            try {
                const data = JSON.parse(body);
                resolve(data);
            }
            catch (err) {
                reject("The data received is not a JSON");
            }
        });
    });
    return promise;
};
