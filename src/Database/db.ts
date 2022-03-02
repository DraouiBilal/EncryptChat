import { MongoClient,Db } from "mongodb";
import config from "../config/config.js"

class Connection{
    private static db:Db | null = null

    private static connectDB = async function():Promise<Db | null>{
        const client:MongoClient = new MongoClient(config.uri);

        try {
            // Connect the client to the server
            await client.connect();
            // Establish and verify connection
            return new Db(client,config.database)
            
        } catch(e: unknown){
            if (typeof e === "string") {
                console.log(`${e}`.toUpperCase())
            } 
            else if (e instanceof Error) {
                console.log(e.message)
            }
            return null
        }
    }
    public static getInstance = async function ():Promise<Db | null>{
        if(Connection.db===null){
            Connection.db = await Connection.connectDB()
            console.log("Successfully connected to DataBase")
        }
        return Connection.db
    }

}

export default Connection