var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoClient, Db } from "mongodb";
import config from "./config.js";
class Connection {
}
Connection.db = null;
Connection.connectDB = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new MongoClient(config.uri);
        try {
            // Connect the client to the server
            yield client.connect();
            // Establish and verify connection
            return new Db(client, config.database);
        }
        catch (e) {
            if (typeof e === "string") {
                console.log(`${e}`.toUpperCase());
            }
            else if (e instanceof Error) {
                console.log(e.message);
            }
            return null;
        }
    });
};
Connection.getInstance = function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (Connection.db === null) {
            Connection.db = yield Connection.connectDB();
            console.log("Successfully connected to DataBase");
        }
        return Connection.db;
    });
};
export default Connection;
