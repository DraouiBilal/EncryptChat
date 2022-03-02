import { MongoClient, Db } from "mongodb";
import config from "../config/config.js";
class Connection {
}
Connection.db = null;
Connection.connectDB = async function () {
    const client = new MongoClient(config.uri);
    try {
        // Connect the client to the server
        await client.connect();
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
};
Connection.getInstance = async function () {
    if (Connection.db === null) {
        Connection.db = await Connection.connectDB();
        console.log("Successfully connected to DataBase");
    }
    return Connection.db;
};
export default Connection;
