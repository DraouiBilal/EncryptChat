import { WebSocketServer } from 'ws';
import UserDAO from "./Database/DAO/UserDAO.js";
let lookupTable = {};
let publicKeys = {};
const socket = (server) => {
    const wss = new WebSocketServer({ server });
    wss.on("connection", (ws) => {
        ws.on("message", async (data) => {
            const msg = JSON.parse(data.toString());
            if (msg.type === "connection") {
                const id = msg.data._id;
                lookupTable[id] = ws;
                const user = await (UserDAO === null || UserDAO === void 0 ? void 0 : UserDAO.findById(id));
                publicKeys[user === null || user === void 0 ? void 0 : user.username] = msg.data.publicKey;
                ws.send(JSON.stringify({ type: "getAllKeys", data: { publicKeys } }));
                const ids = Object.keys(lookupTable);
                ids.forEach(async (id) => {
                    const connectedUsers = await Promise.all(ids.filter((el) => (el !== id)).map(async (el) => await (UserDAO === null || UserDAO === void 0 ? void 0 : UserDAO.findById(el))));
                    lookupTable[id].send(JSON.stringify({ type: "users", data: connectedUsers.map((el) => el === null || el === void 0 ? void 0 : el.username) }));
                    lookupTable[id].send(JSON.stringify({ type: "keys", data: { username: user === null || user === void 0 ? void 0 : user.username, publicKey: msg.data.publicKey } }));
                });
            }
            else {
                const realMsg = msg.data;
                const user = await (UserDAO === null || UserDAO === void 0 ? void 0 : UserDAO.findByCredentials(realMsg.to));
                if (user) {
                    const sendingUser = await (UserDAO === null || UserDAO === void 0 ? void 0 : UserDAO.findById(realMsg.from));
                    lookupTable[user._id.toString()].send(JSON.stringify({ type: "message", data: { from: sendingUser.username, msg: realMsg.message } }));
                }
            }
        });
    });
    console.log("Web socket running on port 5000");
};
export default socket;
