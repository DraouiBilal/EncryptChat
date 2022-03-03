import { createServer } from 'http';
import UserController from './controllers/User.js';
const PORT = 5000;
const HOST = "localhost";
// methods
const POST = "POST";
const OPTIONS = "OPTIONS";
// links 
const LOGIN_LINK = "/api/v1/login";
const REGISTER_LINK = "/api/v1/register";
const UPDATE_LINK = "/api/v1/update";
const server = createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    switch (req.url) {
        case LOGIN_LINK:
            switch (req.method) {
                case POST:
                    return UserController.login(req, res);
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
        case REGISTER_LINK:
            switch (req.method) {
                case POST:
                    return UserController.register(req, res);
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
        case UPDATE_LINK:
            switch (req.method) {
                case POST:
                    return UserController.update(req, res);
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
server.listen(PORT, HOST, async () => {
    console.log(`listening on port ${PORT}`);
});
