import { Server } from "http"
import WebSocket,{ WebSocketServer } from 'ws';
import UserDAO from "./Database/DAO/UserDAO.js";
import { messageT, metaMessageT } from './interfaces/types';
import { TUser } from './Database/models/User';

let lookupTable: any = {}
let publicKeys:any = {}


const socket = (server:Server) => {
    
    
    const wss = new WebSocketServer({ server });
    
    wss.on("connection", (ws:WebSocket) => {
        
        ws.on("message",async (data)=> {
            const msg:metaMessageT = JSON.parse(data.toString())
            if(msg.type === "connection"){
                const id:string = (msg.data as {_id:string,publicKey:string})._id
                lookupTable[id] = ws 
                const user:TUser | null | undefined = await UserDAO?.findById(id)
                publicKeys[user?.username as string] = (msg.data as {_id:string,publicKey:string}).publicKey
                ws.send(JSON.stringify({type: "getAllKeys",data: {publicKeys}}))
                const ids:string[] = Object.keys(lookupTable)
                ids.forEach(async id => {
                    const connectedUsers: (TUser | null | undefined)[] = await Promise.all(ids.filter((el:string)=> (el!==id)).map(async(el:string):Promise<TUser | null | undefined> => await UserDAO?.findById(el)))
                    lookupTable[id].send(JSON.stringify({type:"users",data:connectedUsers.map((el:(TUser | null | undefined))=>el?.username)}))        
                    lookupTable[id].send(JSON.stringify({type:"keys",data:{username:user?.username,publicKey:msg.data.publicKey}}))
                })
            }
            else{
                const realMsg: messageT = msg.data as messageT
                const user:TUser | null = await UserDAO?.findByCredentials(realMsg.to) as TUser | null;
                if(user){
                    const sendingUser:TUser | null | undefined = await UserDAO?.findById(realMsg.from);
                    (lookupTable[user._id!.toString()] as WebSocket).send(JSON.stringify({type:"message",data:{from:sendingUser!.username,msg:realMsg.message}}))
                }
            }
            
        })
        
        
    })
    console.log("Web socket running on port 5000");
}

export default socket