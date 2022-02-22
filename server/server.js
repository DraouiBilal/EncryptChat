import { createServer } from 'http';
const PORT = 5000;
const HOST = "localhost";
// methods
const POST = "POST";
const OPTIONS = "OPTIONS";
// links 
const LOGIN_LINK = "/api/v1/login";
const server = createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let body = "";
    switch (req.url) {
        case LOGIN_LINK:
            switch (req.method) {
                case POST:
                    req.on("data", chunk => {
                        body += chunk;
                    });
                    req.on("end", () => {
                        const { login, password } = JSON.parse(body);
                        console.log(login, password);
                        res.end();
                    });
                    break;
                case OPTIONS:
                    res.writeHead(200, {
                        "Accept": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "*",
                        "Access-Control-Allow-Headers": "*"
                    });
                    res.end();
                    break;
                default:
                    res.writeHead(405, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({
                        "msg": "METHOD NOT ALLOWED"
                    }));
                    res.end();
            }
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("404 NOT FOUND");
    }
});
server.listen(PORT, HOST, () => {
    console.log(`listening on port ${PORT}`);
});
